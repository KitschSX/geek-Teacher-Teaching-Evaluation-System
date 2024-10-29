var menuData = [
	{
		id: "menu1",
		title: "管理员管理",
		url: "./html/manager/admin.html"
	},
	{
		id: "menu2",
		title: "老师管理",
		url: "./html/manager/teacherManage.html",
	},
	{
		id: "menu3",
		title: "学生管理",
		url: "./html/manager/studentManage.html",
	},
	{
		id: "menu4",
		title: "评价指标管理",
		url: "./html/manager/evaluationMethod.html",
	},
	{
		id: "menu5",
		title: "评价结果查看",
		url: "./html/manager/teacherManageData.html",
	},
];

// 获取渲染菜单和内容区域元素
var menuSection = document.getElementById("menuSection");
var mainFrame = document.getElementById("mainFrame");


function createMenuItem(menuItem, isExpanded) {
	const liElement = document.createElement("li");
 
	const titleElement = document.createElement("span");
	titleElement.textContent = menuItem.title;
	titleElement.classList.add("title");
 
	// 添加 click 事件处理函数
	liElement.addEventListener("click", function (event) {
		event.stopPropagation();
 
		// 如果有子菜单，则展开/折叠子菜单
		if (menuItem.children) {
			// 首先折叠其他已展开的菜单项
			for (let i = 0; i < menuData.length; i++) {
				const otherMenuItem = menuData[i];
				if (otherMenuItem !== menuItem && otherMenuItem.expanded) {
					otherMenuItem.expanded = false;
					const otherLiElement = menuSection.querySelector(`li[data-id="${otherMenuItem.id}"]`);
					const otherUlElement = otherLiElement.querySelector(".submenu");
					otherUlElement.style.display = "none";
				}
			}
 
			// 切换当前菜单项的展开状态
			menuItem.expanded = !menuItem.expanded;
 
			// 根据展开状态设置子菜单的 display 样式
			const ulElement = liElement.querySelector(".submenu");
			ulElement.style.display = menuItem.expanded ? "block" : "none";
		} else {
			// 如果点击的是没有子菜单的菜单项，则加载对应的URL
			const url = menuItem.url;
			if (url) {
				mainFrame.src = url;
			}
 
			// 切换选中状态
			const selectedItems = menuSection.getElementsByClassName("selected");
			for (let i = 0; i < selectedItems.length; i++) {
				selectedItems[i].classList.remove("selected");
			}
			liElement.classList.add("selected");
		}
	});
 
	liElement.appendChild(titleElement);
 
	if (menuItem.children) {
		const ulElement = document.createElement("ul");
		ulElement.classList.add("submenu");
 
		// 根据展开状态设置子菜单的 display 样式
		ulElement.style.display = isExpanded ? "block" : "none";
 
		for (let i = 0; i < menuItem.children.length; i++) {
			const childMenuItem = menuItem.children[i];
			const childLiElement = createMenuItem(childMenuItem);
			childLiElement.setAttribute("data-id", childMenuItem.id);
			ulElement.appendChild(childLiElement);
		}
 
		liElement.appendChild(ulElement);
	} else {
		liElement.setAttribute("data-url", menuItem.url);
	}
 
	return liElement;
}
 
// 渲染菜单
function renderMenu(data, parentElement) {
	var ulElement = document.createElement("ul");
	for (var i = 0; i < data.length; i++) {
		var menuItem = data[i];
		const isExpanded = i === 0; // 默认展开第一个菜单项
		var liElement = createMenuItem(menuItem, isExpanded);
 
		// 如果该菜单项有子菜单，则添加 class="hasChildren" 样式类
		if (menuItem.children) {
			liElement.classList.add("hasChildren");
		}
 
		ulElement.appendChild(liElement);
	}
	parentElement.appendChild(ulElement);
}
 
// 初始化菜单
function initMenu() {
	renderMenu(menuData, menuSection);
 
	// 默认展示第一个包含 url 的子菜单项并选中
	var firstMenuItem = menuData[0];
	var foundFirstUrl = false; // 标志位，表示是否找到第一个包含URL的子菜单项
 
	if (firstMenuItem && firstMenuItem.children) {
		// 递归函数，用于处理多级菜单情况
		function findFirstUrl(menuItems) {
			for (var i = 0; i < menuItems.length; i++) {
				var menuItem = menuItems[i];
 
				if (menuItem.url) {
					mainFrame.src = menuItem.url;
					var liElement = menuSection.querySelector('li[data-url="' + menuItem.url + '"]');
					liElement.classList.add("selected");
					foundFirstUrl = true;
					break;
				}
 
				if (menuItem.children) {
					findFirstUrl(menuItem.children);
					if (foundFirstUrl) {
						break;
					}
				}
			}
		}
 
		findFirstUrl(firstMenuItem.children);
	}
 
	// 如果没有找到第一个包含URL的子菜单项，则直接渲染URL
	if (!foundFirstUrl && firstMenuItem.url) {
		mainFrame.src = firstMenuItem.url;
		var liElement = menuSection.querySelector('li[data-url="' + firstMenuItem.url + '"]');
		liElement.classList.add("selected");
	}
 
	// 点击菜单项展开或收起子菜单
	menuSection.addEventListener("click", function (event) {
		var target = event.target;
		var liElement = target.closest("li");
		if (liElement) {
			// 是否包含子菜单
			var hasChildren = liElement.classList.contains("hasChildren");
 
			// 获取已展开的菜单项
			var expandedItems = menuSection.querySelectorAll(".expanded");
 
			// 判断点击的菜单项是否已展开
			var isExpanded = liElement.classList.contains("expanded");
 
			// 如果菜单项包含子菜单，则阻止默认行为
			if (hasChildren) {
				event.preventDefault();
			}
 
			// 遍历已展开的菜单项，折叠除当前点击的菜单项以外的其他已展开菜单项
			expandedItems.forEach(function (item) {
				if (item !== liElement && !liElement.contains(item)) {
					item.classList.remove("expanded");
					var submenu = item.querySelector(".submenu");
					submenu.style.display = "none";
				}
			});
 
			// 如果点击的菜单项是已展开的，则折叠；否则展开
			if (isExpanded) {
				liElement.classList.remove("expanded");
				if (hasChildren) {
					var submenu = liElement.querySelector(".submenu");
					submenu.style.display = "none";
				}
			} else {
				liElement.classList.add("expanded");
				if (hasChildren) {
					var submenu = liElement.querySelector(".submenu");
					submenu.style.display = "block";
					var firstLink = submenu.querySelector("a");
					if (firstLink) {
						firstLink.focus();
					}
				}
			}
		}
	});
}
 

initMenu();
// document.addEventListener('DOMContentLoaded', function () {
//     fetch('http://localhost:3000/teachers')
//         .then(response => response.json())
//         .then(data => {
//             const teacherList = document.getElementById('teacherList');
//             data.teachers.forEach(teacher => {
//                 const listItem = document.createElement('li');
//                 listItem.textContent = `${teacher.name} - ${teacher.department}`;
//                 teacherList.appendChild(listItem);
//             });
//         })
//         .catch(error => {
//             console.error('获取教师列表失败:', error);
//         });
// });

// document.getElementById('addTeacher').addEventListener('click', function () {
//     const newTeacher = prompt('请输入新教师姓名');
//     if (newTeacher) {
//         fetch('http://localhost:3000/teachers', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ name: newTeacher })
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.status === 'success') {
//                     alert('教师添加成功');
//                     location.reload();
//                 } else {
//                     alert('教师添加失败');
//                 }
//             })
//             .catch(error => {
//                 console.error('添加教师失败:', error);
//             });
//     }
// });

document.getElementById('logout').addEventListener('click', function () {
    window.location.href = 'login.html';
});
