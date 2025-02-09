export const getMachineCode = (): string => {
  const STORAGE_KEY = 'FOXF_MACHINE_CODE'
  
  // 从本地存储获取机器码
  let machineCode = localStorage.getItem(STORAGE_KEY)
  
  if (!machineCode) {
    // 生成一个固定格式的机器码：12位数字和字母的组合
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    machineCode = Array(12)
      .fill(0)
      .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
      .join('')
      
    // 保存到本地存储
    localStorage.setItem(STORAGE_KEY, machineCode)
  }
  
  return machineCode
} 