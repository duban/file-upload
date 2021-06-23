<template>
  <div id="app">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>FILE UPLOAD</span>
    </div>
    <div>
    <el-upload
        class="upload-demo"
        ref="upload"
        drag
        action="localhost:5000/upload"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :auto-upload="false"
        :show-file-list="false"
        accept=".zip"
        :multiple="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    </el-upload>
    <br>
      <div v-if="fileList.length !== 0">
      <el-table
          :data="fileList"
          ref="table"
          stripe
          style="width: 100%">
<!--        <el-table-column-->
<!--            prop="uid"-->
<!--            label="UID"-->
<!--            width="100">-->
<!--        </el-table-column>-->
        <el-table-column
            prop="raw.name"
            label="Name"
            width="300">
        </el-table-column>
        <el-table-column
            prop="raw.type"
            label="Type"
            align="center"
            width="120">
        </el-table-column>
        <el-table-column
            prop="raw.size"
            label="Size"
            align="center"
            width="100">
        </el-table-column>
        <el-table-column
            prop="date"
            label="Date"
            align="center"
            width="150">
        </el-table-column>
<!--        <el-table-column-->
<!--            prop="status"-->
<!--            label="Status"-->
<!--            align="center"-->
<!--            width="90">-->
<!--        </el-table-column>-->
        <el-table-column
            prop="duration"
            label="Duration (Sec)"
            align="center"
            width="130">
        </el-table-column>
        <el-table-column
            prop="price"
            label="Price (USD)"
            align="center"
            width="140">
        </el-table-column>
      </el-table>
      <br>
        <el-button @click="submitUpload" type="primary" size="medium" style="width: 100px">Upload</el-button>
        <el-button @click="handleClose" size="medium" style="width: 100px">Cancel</el-button>
      </div>
    </div>
  </el-card>
<!--    <div slot="header" class="clearfix">-->
<!--      <span>FILE UPLOAD</span>-->
<!--    </div>-->
  </div>
</template>

<script>
/* eslint-disable */
import moment from 'moment'
import axios from 'axios'
export default {
  name: "Upload",
  data() {
    return {
      files: '',
      response: {},
      percentage: 20,
      customColor: '#409eff',
      customColors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ],
      file: {},
      fileList: [],
    }
  },
  watch: {
    fileList: function(val) {
    }
  },
  methods: {
    upload(event) {
      let data = new FormData();
      let file = event.target.files[0];
      console.log('file', file)

      data.append('name', 'my-file')
      data.append('file', file)

      let config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }

      // axios.post('/api', data, config).then(
      //     response => {
      //
      //     })
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    parseDate(timestamp){
      // console.log(moment(timestamp).format('YYYY-MM-DD HH:mm:ss'))
      return moment(timestamp).format('YYYY-MM-DD')
    },
    handleClose(done) {
      // var clearFiles = this.$refs.clearFiles();
      this.$confirm('Cancel the uploading file?')
          .then(_ => {
            this.fileList.length = 0
            this.$forceUpdate();
            // console.log(this.$refs.table.tableData)
            this.$refs.upload.clearFiles();
            console.log(this.fileList)
            // this.$forceUpdate();
            done();
          })
          .catch(_ => {});
    },
    save(formData) {
        return axios({
          method: "post",
          url: "http://localhost:5000/upload",
          data: formData,
        }).then((res) => {
          // console.log(res)
          // this.response = res.data
          return res.data
        }).catch((err) => {
          throw err;
          return null
        });


      // axios({
      //   method: 'post',
      //   url: 'http://localhost:5000/upload',
      //   data: formData,
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // }).then(function (response) {
      //       //handle success
      //       console.log(response);
      // }).catch(function (response) {
      //       //handle error
      //   console.log(response);
      // });

      // axios.post('http://localhost:5000/upload',
      //     formData, {headers: {'Content-Type': 'multipart/form-data'}}
      // ).then(function(){
      //   console.log('SUCCESS!!');
      // }).catch(function(){
      //   console.log('FAILURE');
      // });
      // this.$emit('postcreated')

    },
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-3)
      let formData = new FormData();
      // formData.append('file', file.raw);
      // const dataPromise = this.save(formData)
      //     dataPromise.then(result => {
      fileList.map(item => {
              formData.append('file', item['raw']);
              console.log('form', formData)
              const dataPromise = this.save(formData)
              // console.log('form', dataPromise)
              dataPromise.then(result => {
                item['date'] = this.parseDate(item['raw'].lastModified)
                item['duration'] = result.original_file.total_duration
                item['price'] = result.original_file.total_price
                // this.fileList.push(item)
                this.fileList.push(item)
                console.log(item)
              }).catch(err => {
                  console.log('err', err);
              })
              // this.fileList = fileList;
              // console.log(this.fileList)

              // console.log(item['raw'])
              // fileList.push({date:this.parseDate(item['raw'].lastModified)})
              // item['date'] = this.parseDate(item['raw'].lastModified)
              // item['duration'] = result.original_file.total_duration
              // item['price'] = result.original_file.total_price
              //   this.file['name'] = item['raw']['name']
              //   this.file['size'] = item['raw']['size']
              //   this.file['type'] = item['raw']['type']
              //   this.file['uid'] = item['raw']['uid']
              //   this.fileList.push(JSON.parse(this.file))
            })
            // this.fileList = fileList;
            // console.log(this.fileList)
          // })

                // this.files = formData

      // axios.post('http://localhost:5000/upload', formData, config).then(
      //     response => {
      //       console.log(response)
      //     }).catch(err => {
      //         console.log('err', err);
      //       })

      // axios.post('http://localhost:5000/upload',
      //     formData, {headers: {'Content-Type': 'multipart/form-data'}}
      // ).then(function(){
      //   console.log('SUCCESS!!');
      // }).catch(function(){
      //   console.log('FAILURE');
      // });
      // console.log(this.$refs.upload)
      // fileList.map(item => {
        // fileList.push({date:this.parseDate(item['raw'].lastModified)})
        // item['date'] = this.parseDate(item['raw'].lastModified)
      //   this.file['name'] = item['raw']['name']
      //   this.file['size'] = item['raw']['size']
      //   this.file['type'] = item['raw']['type']
      //   this.file['uid'] = item['raw']['uid']
      //   this.fileList.push(JSON.parse(this.file))
      // })
      // this.fileList = fileList;
      // console.log('files',this.fileList)
      // this.file['name'] = fileList[0]['raw'].name
      // this.file['type'] = fileList[0]['raw'].type
      // this.file['size'] = fileList[0]['raw'].size
      // this.file['uid'] = fileList[0]['raw'].uid
      // this.file['lastModified'] = fileList[0]['raw'].lastModified
      // this.fileList.push(this.file)

      // console.log('file', this.$refs.upload.files)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log('file',file);
    },
    handleExceed(files, fileList) {
      console.log('files',files)
      this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
    },
    beforeRemove(file) {
      return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
      // return this.$confirm(`Cancel the transfert of ${ file.name } ?`)
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  align-items: center;
}

</style>