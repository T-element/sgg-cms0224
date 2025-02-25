import { ref } from 'vue'

function useDentify() {
  const identifyCodes = '1234567890abcdefjhijklinopqrsduvwxyz'
  const identifyCode = ref()
  // 重置验证码
  const refreshCode = () => {
    makeCode(identifyCode, 4)
  }
  //获取验证码的值
  const makeCode = (o, l) => {
    identifyCode.value = ''
    for (let i = 0; i < l; i++) {
      //通过循环获取字符串内随机几位
      identifyCode.value += identifyCodes[randomNum(0, identifyCodes.length)]
    }
  }
  //随机数字：用于当角标拿字符串的值
  const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }

  return {
    identifyCode,
    refreshCode,
  }
}

export default useDentify
