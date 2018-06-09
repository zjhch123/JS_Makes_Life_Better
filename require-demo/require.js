// 1. 获取依赖，建立依赖树
// 2. 加载脚本，挂载返回参数
// 3. 执行
// ps: 一次全部加载完js脚本之后再执行，并非按需加载
;(function() {
  const cachedModule = window.cachedModule = {}
  let moduleMap = null
  let totalDeps = 0

  const excuteModule = function(module) {
    const params = []
    for (let i in module.deps) {
      params.push(cachedModule[module.deps[i]].retValue)
    }
    module.retValue = module.export.apply(this, params)
  }

  const loadModule = function(moduleName) {
    const module = cachedModule[moduleName]
    module.state = 'loading'
    if (module.depLength == 0) {
      module.state = 'loaded'
      excuteModule(module)
    } else {
      for (let i in module.deps) {
        module.depLength--
        if (cachedModule[module.deps[i]].state === 'loaded') {
          if (module.depLength == 0) {
            excuteModule(module)
            break
          }
        }
        if (cachedModule[module.deps[i]].state === 'init') {
          loadModule(module.deps[i])
        }
      }
      module.state = 'loaded'
      excuteModule(module)
    }
  }

  const loadDeps = function(deps) {
    for (let i in deps) {
      ; (function () {
        totalDeps++
        const moduleName = deps[i]
        const modulePath = moduleMap[moduleName]
        loadScript(modulePath, moduleName, () => { 
          totalDeps--;
          if (totalDeps == 0) { 
            loadModule('MAIN_MODULE')
          }
        })
      })(i)
    }
  }

  const loadScript = function(url, id, callback) {
    if (!!document.getElementById(id)) {
      callback()
      return
    }
    const s = document.createElement('script')
    s.src = url
    s.async = true
    s.id = id
    s.onload = callback
    document.head.appendChild(s)
  }

  const require = function (deps, callback) {
    const module = {
      name: 'MAIN_MODULE',
      state: 'init',
      deps: deps,
      depLength: deps.length,
      export: callback,
      retValue: null
    }
    cachedModule[module.name] = module
    loadDeps(module.deps)
  }

  const define = function (deps, callback) {
    const moduleName = document.currentScript && document.currentScript.id
    if (moduleName in cachedModule) return
    const module = {
      name: moduleName,
      state: 'init',
      deps: deps,
      depLength: deps.length,
      export: callback,
      retValue: null
    }
    cachedModule[module.name] = module
    loadDeps(module.deps)
  }

  require.config = function(val) {
    moduleMap = val
  }

  window.require = require
  window.define = define
})()