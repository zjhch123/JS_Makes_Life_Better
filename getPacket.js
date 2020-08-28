class Main extends WorkFlow {
  @workflow('query_money')   // 会发出 before_query_money 和 after_query_money 事件
  queryMoney() {
    doQueryMoney()
  }

  @workflow('get_red_packet')
  getRedPacket() {
    doGetPacket()
  }
}

class Sub extends WorkFlow {

  @workflow('query_user_info')
  queryUserInfo() {
    doQueryUserInfo()
  }
}

const mainWorkFlow = new Main()
const subWorkFlow = new Sub()

const QueryMoneyPlugin = Main.definePlugin('query_money', (workflow) => {
  workflow.on('before', (callback) => {
    subWorkFlow.start()
    callback()
  })
  workflow.on('after', (callback) => {
    UI.render()
    callback()
  })
})

const GetRedPacketPlugin = Main.definePlugin('get_red_packet', (workflow) => {
  workflow.on('after', (callback) => {
    UI.render()
    callback()
  })
})

const QueryUserInfoPlugin = Main.definePlugin('query_user_info', (workflow) => {
  workflow.on('after', (callback) => {
    UI.render()
    callback()
  })
})

mainWorkFlow.register([
  QueryMoneyPlugin(),
  GetRedPacketPlugin()
])
subWorkFlow.register([
  QueryUserInfoPlugin()
])

mainWorkFlow.start()

