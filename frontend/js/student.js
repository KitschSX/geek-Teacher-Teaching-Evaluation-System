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
