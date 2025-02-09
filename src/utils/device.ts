export const getMachineCode = (): string => {
  // 生成一个固定格式的机器码：12位数字和字母的组合
  const generateCode = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  // 从本地存储获取机器码，如果没有则生成新的
  let machineCode = localStorage.getItem('machine_code');
  if (!machineCode) {
    machineCode = generateCode();
    localStorage.setItem('machine_code', machineCode);
  }
  
  return machineCode;
}; 