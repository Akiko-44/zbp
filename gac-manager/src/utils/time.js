export function formatDate (timestamp, fmt) {
  const date = new Date(timestamp)
  var o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      if (k === 'y+') {
        fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length))
      } else if (k === 'S+') {
        var lens = RegExp.$1.length
        lens = lens === 1 ? 3 : lens
        fmt = fmt.replace(
          RegExp.$1,
          ('00' + o[k]).substr(('' + o[k]).length - 1, lens)
        )
      } else {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
  }
  return fmt
}

/**
 * 取时间差
 */
export class TimeDifference {
  constructor () {
    this.second = 1000
    this.minute = this.second * 60
    this.hour = this.minute * 60
    this.day = this.hour * 24
    this.year = this.day * 365
    this.month = this.day * 30
    this.template = [
      { year: '年' },
      { month: '月' },
      { day: '天' },
      { hour: '时' },
      { minute: '分' },
      { second: '秒' }
    ]
    this.limit = ['year', 'month', 'day', 'hour', 'minute', 'second']
    this.data = {}
  }
  get (startDate, endDate, limit) {
    if (typeof startDate === 'string') {
      this._value = new Date(endDate.replace(/-/g,'/')).getTime() - new Date(startDate.replace(/-/g,'/')).getTime()
    } else {
      this._value = endDate - startDate
    }
    ;(limit || this.limit).forEach(this.compute.bind(this))
    return this.data
  }
  format (startDate, endDate, options = {}) {
    let output = ''
    this.get(startDate, endDate, options.limit)
    ;(options.template || this.template).forEach(item => {
      Object.keys(item).forEach(key => {
        if (this.data[key]) {
          output += this.data[key] + item[key]
        }
      })
    })
    return output
  }
  compute (type) {
    const value = this._value
    const unit = this[type]
    if (value >= unit) {
      this.data[type] = ~~(value / unit)
      this._value -= this.data[type] * unit
    }
  }
}

// 单例
const timeDifferenceInstance = new TimeDifference()

export const timeDifference = function (startDate, endDate) {
  return timeDifferenceInstance.format(startDate, endDate)
}
