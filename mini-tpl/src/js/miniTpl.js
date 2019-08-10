/*
<ul>
  <% for(var i=0; i < data.length; i++) {
    var item = data[i];
    if(item.age < 30){%>
        <li>我的名字是<%=item.name%>，我的年龄是<%=item.age%></li>
    <%}else{%>
        <li>my name is <%=item.name%>,my age is a sercet.</li>
    <%}%>
  <% } %>
</ul>

=== CONVERT TO ===

var tpl = ""
tpl += '<ul'>
for (var i = 0; i < data.length; i++) {
  var item = data[i];
  if (item.age < 30) {
    tpl += '<li>我的名字是' + item.name + ', 我的年龄是' + item.age + '</li>'
  } else {
    tpl += '<li>my name is' + item.name' + ', my arge is a secret.</li>'
  }
}
tpl += '</ul>'
return tpl
*/

function appendText(list, content) {
  content = content.replace(/\r?\n/g, '\\n');
  list.push({ txt: content });
}

function transform(content) {
  const arr = []
  const reg = /<%([\s\S]*?)%>/g
  let match = reg.exec(content)
  let nowIndex = 0

  while (match) {
    appendText(arr, content.substring(nowIndex, match.index))
    const item = {
      type: 1,
      txt: match[1]
    }
    if (match[1].substr(0, 1) === '=') {
      item.type = 2
      item.txt = match[1].substr(1)
    }
    arr.push(item)
    nowIndex = match.index + match[0].length
    match = reg.exec(content)
  }
  return arr
}

function buildFunction(token) {
  const list = ['var tpl = "";']

  for (let i = 0; i < token.length; i++) {
    const code = token[i]
    if (code.type === 1) {
      list.push(code.txt)
    } else if (code.type === 2) {
      list.push('tpl += ' + code.txt + ';')
    } else {
      list.push(`tpl += "${code.txt.replace(/"/g, '\\"')}";`)
    }
  }

  list.push('return tpl;')
  return new Function('data', list.join('\n')) // eslint-disable-line
}

export default function(content, data = {}) {
  return buildFunction(transform(content))(data) 
}
