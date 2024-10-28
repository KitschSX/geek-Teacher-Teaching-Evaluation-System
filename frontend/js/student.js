
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/users/teachers')
        .then(response => response.json())
        .then(data => {
            const teacherSelect = document.getElementById('teacher');
            data.teachers.forEach(teacher => {
                const option = document.createElement('option');
                option.value = teacher.id;
                option.textContent = teacher.name;
                teacherSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('获取教师列表失败:', error);
        });
    fetch('http://localhost:3000/users/evaluations')
        .then(response => response.json())
        .then(data => {
            // 获取所有的评价指标并放入表单内
            const evaluationForm = document.getElementById('evaluationForm');
            data.evaluations.forEach(evaluation => {
                const evaluation1 = useEvaluation(evaluation);
                console.log(stringToHTML(evaluation1))
                evaluationForm.appendChild(stringToHTML(evaluation1));
            })

            })
        .catch(error => {
            console.error('获取教师列表失败:', error);
        })
        .finally(()=>{
            const evaluationForm = document.getElementById('evaluationForm');
            evaluationForm.appendChild(stringToHTML(`<button type="submit" class="button">提交评价</button>`));
        })
});


document.getElementById('evaluationForm').addEventListener('submit', function (event) {
    
    event.preventDefault();
    const teacherId = document.getElementById('teacher').value;
    const score = document.getElementById('score').value;

    fetch('http://localhost:3000/users/evaluate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ teacherId, score })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.code)
            if (data.code === '200') {
                alert('评价提交成功！');
                document.getElementById('evaluationForm').reset();
            } else {
                alert('评价提交失败，请稍后再试。');
            }
        })
        .catch(error => {
            console.error('提交评价失败:', error);
        });
});

document.getElementById('logout').addEventListener('click', function () {
    window.location.href = 'login.html';
});

var stringToHTML = function (str) {
	var dom = document.createElement('div');
	dom.innerHTML = str;
	return dom;
 
};
function useEvaluation(data){
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