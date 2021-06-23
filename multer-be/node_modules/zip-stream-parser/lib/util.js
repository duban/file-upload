function parseDateTime(buf) {
  let timeN = buf.readUInt16LE(0);
  let dateN = buf.readUInt16LE(2);
  
  const second = (timeN & (~(~0 << 5))) * 2    ; timeN >>= 5;
  const minute =  timeN & (~(~0 << 6))         ; timeN >>= 6;
  const hour   =  timeN                        ;
  
  const day    =  dateN & (~(~0 << 5))         ; dateN >>= 5;
  const month  = (dateN & (~(~0 << 4))) - 1    ; dateN >>= 4;
  const year   =  dateN                 + 1980 ;
  
  const t = new Date(year, month, day, hour, minute, second);
  return t;
}

exports.parseDateTime = parseDateTime;
