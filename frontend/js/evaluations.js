//表单内的元素，用于动态添加不同的评价方式和内容，如文本框，评分，多选
export function useEvaluation(data){
  if(data.method === 'input'){
    return `<div class="form-group">
      <label for="${data.name}">${data.title}</label>
      <input type="text" class="form-control" id="${data.name}" placeholder="${data.placeholder}">
    </div>`
  } else if(data.method === 'score'){
    return `<div class="form-group">
      <label for="${data.name}">${data.title}</label>
      <select class="form-control" id="${data.name}">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>`
  } else if(data.method === 'radio'){
    return `<div class="form-group">
      <label for="${data.name}">${data.title}</label>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${data.name}" id="${data.name}-1" value="1">
        <label class="form-check-label" for="${data.name}-1">${data.options[0]}</label>
        </input>
      </div>`
  } else if(data.method === 'checkbox'){
    return `<div class="form-group">
      <label for="${data.name}">${data.title}</label>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="${data.name}" id="${data.name}-1" value="1">
        <label class="form-check-label" for="${data.name}-1">${data.options[0]}</label>
        </input>
      </div>`
  } else {
    return ''
  }
}