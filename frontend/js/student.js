const API_URL = 'http://localhost:3000/api';

let evaluations = []; // 存储评价指标数据

// DOM 加载完成后，获取教师列表和评价指标
document.addEventListener('DOMContentLoaded', function () {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
        alert('您还未登录，请先登录');
        window.location.href = 'login.html';
        return;
    }

    // 获取教师列表
    fetch(`${API_URL}/teachers`, {
        headers: {
            'Authorization': localStorage.getItem('jwtToken'),
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const teacherSelect = document.getElementById('teacher');
                data.forEach(teacher => {
                    const option = document.createElement('option');
                    option.value = teacher.id;
                    option.textContent = teacher.name;
                    teacherSelect.appendChild(option);
                });
            } else {
                console.log(data)
                console.error('教师数据格式错误');
            }
        })
        .catch(error => {
            console.error('获取教师列表失败:', error);
        });

    // 获取评价指标
    fetch(`${API_URL}/evaluations/metrics`, {
        headers: {
            'Authorization': localStorage.getItem('jwtToken'),
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const evaluationForm = document.getElementById('evaluationForm');
                evaluations = data; // 存储评价指标以便提交
                data.forEach(evaluation => {

                    const evaluationHTML = useEvaluation(evaluation);
                    console.log('form', evaluationForm)
                    evaluationForm.innerHTML += evaluationHTML;
                    console.log('form', stringToHTML(evaluationHTML), evaluationForm)
                });
            } else {
                console.log(data)
                console.error('评价数据格式错误');
            }
        })
        .catch(error => {
            console.error('获取评价指标失败:', error);
        })
        .finally(() => {
            const evaluationForm = document.getElementById('evaluationForm');
            evaluationForm.appendChild(stringToHTML('<button type="submit" class="button">提交评价</button>'));
        });
});

// 提交评价表单
document.getElementById('evaluationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const evaluationForm = document.getElementById('evaluationForm');

    // 构建表单数据对象
    let formData = {
        teacherId: evaluationForm.elements['teacher'].value,
        formData: [],
        evaluations: evaluations
    };

    if (!formData.teacherId) {
        alert('请选择教师');
        return;
    }

    let checkBox = [];
    for (let i = 1; i < evaluationForm.elements.length; i++) {
        const element = evaluationForm.elements[i];
        if (element.type === 'text' || element.type === 'select-one') {
            formData.formData.push(element.value);
        } else if (element.type === 'radio' && element.checked) {
            formData.formData.push(element.value);
        } else if (element.type === 'checkbox' && element.checked) {
            checkBox.push(element.value);
        }
    }

    if (checkBox.length > 0) {
        formData.formData.push(checkBox);
    }

    // 提交评价数据
    const jwtToken = localStorage.getItem('jwtToken');
    fetch(`${API_URL}/evaluations/results`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwtToken'),
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {

            alert('评价提交成功！');
            document.getElementById('evaluationForm').reset();

        })
        .catch(error => {
            console.error('提交评价失败:', error);
        });
});

// 退出登录
document.getElementById('logout').addEventListener('click', function () {
    localStorage.removeItem('jwtToken'); // 删除 JWT 令牌
    window.location.href = 'login.html';
});

// 将字符串转换为 HTML 元素
var stringToHTML = function (str) {
    var dom = document.createElement('div');
    dom.innerHTML = str;
    return dom.firstChild;
};

// 根据评价指标生成相应的表单元素
function useEvaluation(data) {
    // console.log(data)
    if (data.name === 'input') {
        return `
        <div class="form-group">
            <label for="${data.id}" class="from-label">${data.title}</label>
            <input type="text" class="form-control" id="${data.id}" name="${data.name}" placeholder="${data.placeholder || ''}" required>
        </div>`;
    } else if (data.name === 'score') {
        if (data.options.length === 0) {
            console.warn(`Score options for ${data.name} are empty.`);
            return ''; // 如果选项为空，则返回空字符串
        }
        let options = data.options.map(option => `<option value="${option}">${option}</option>`).join('');
        return `
        <div class="form-group">
            <label for="${data.id}" class="from-label">${data.title}</label>
            <select class="form-control" id="${data.id}" name="${data.name}" required>
                ${options}
            </select>
        </div>`;
    } else if (data.name === 'radio') {
        if (data.options.length === 0) {
            console.warn(`Radio options for ${data.name} are empty.`);
            return ''; // 如果选项为空，则返回空字符串
        }
        let radios = data.options.map((option, index) => `
        <input class="form-check-input" type="radio" name="${data.name}" id="${data.id}-${index + 1}" value="${option}" required>
        <label class="form-check-label" for="${data.id}-${index + 1}">${option}</label>`).join('');
        return `
        <div class="form-group flex-box">
            <label class="from-label">${data.title}</label>
            <div class="form-check flex-box form-single">
                ${radios}
            </div>
        </div>`;
    } else if (data.name === 'checkbox') {
        if (data.options.length === 0) {
            console.warn(`Checkbox options for ${data.name} are empty.`);
            return ''; // 如果选项为空，则返回空字符串
        }
        let checkboxes = data.options.map((option, index) => `
        <input class="form-check-input checkbox-input-${data.id}" type="checkbox" name="${data.name}" id="${data.id}-${index + 1}" value="${option}" onclick='deRequire("checkbox-input-${data.id}")' required>
        <label class="form-check-label" for="${data.id}-${index + 1}">${option}</label>`).join('');
        return `
    <div class="form-group flex-box">
        <label class="from-label">${data.title}</label>
        <div class="form-check flex-box form-single">
            ${checkboxes}
        </div>
    </div>`;
    } else {
        return ''; // 对于未识别的方法，返回空字符串
    }
}


function deRequire(elClass) {
    const elements = document.getElementsByClassName(elClass);
    let atLeastOneChecked = Array.from(elements).some(el => el.checked);

    Array.from(elements).forEach(el => {
        el.required = !atLeastOneChecked; // 如果没有选中任何一个，则设置为必填
    });
}

