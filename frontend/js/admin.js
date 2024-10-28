document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/teachers')
        .then(response => response.json())
        .then(data => {
            const teacherList = document.getElementById('teacherList');
            data.teachers.forEach(teacher => {
                const listItem = document.createElement('li');
                listItem.textContent = `${teacher.name} - ${teacher.department}`;
                teacherList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('获取教师列表失败:', error);
        });
});

document.getElementById('addTeacher').addEventListener('click', function () {
    const newTeacher = prompt('请输入新教师姓名');
    if (newTeacher) {
        fetch('http://localhost:3000/teachers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newTeacher })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('教师添加成功');
                    location.reload();
                } else {
                    alert('教师添加失败');
                }
            })
            .catch(error => {
                console.error('添加教师失败:', error);
            });
    }
});

document.getElementById('logout').addEventListener('click', function () {
    window.location.href = 'login.html';
});
