
// 传统JavaScript版本 - 避免ES6模块化语法

// 技能数据
const completeSkillsData = window.completeSkillsData || {
    lastUpdated: "2026-03-03T13:00:00+08:00",
    totalSkills: 59,
    skills: [
        {
            id: "frontend-design",
            name: "前端设计与开发",
            category: "设计与前端",
            level: "高级",
            experience: "2年",
            description: "专业的网页前端开发，擅长响应式设计和用户体验优化",
            icon: "fas fa-code",
            tags: ["HTML5", "CSS3", "JavaScript", "响应式"]
        }
        // 其他技能数据...
    ],
    statistics: {
        byCategory: {
            "设计与前端": 8,
            "内容创作": 6,
            "视频制作": 14,
            "人工智能": 3,
            "工具开发": 28
        },
        byLevel: {
            "高级": 28,
            "中级": 31,
            "初级": 0
        }
    }
};

// 初始化函数
function initSkillsCenter() {
    console.log('技能中心初始化');
    
    // 这里可以添加初始化代码
    if (typeof renderSkillsGrid === 'function') {
        renderSkillsGrid(completeSkillsData.skills);
    }
    
    if (typeof initRadarChart === 'function') {
        initRadarChart(completeSkillsData.statistics.byCategory);
    }
}

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', initSkillsCenter);

// 全局函数
document.renderSkillsGrid = function(skills) {
    const container = document.getElementById('skills-container');
    if (!container) return;
    
    container.innerHTML = skills.map(skill => 
        `<div class="skill-card">
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
            <div>分类: ${skill.category} | 等级: ${skill.level}</div>
        </div>`
    ).join('');
};

document.initRadarChart = function(data) {
    const ctx = document.getElementById('skills-radar');
    if (!ctx) return;
    
    const categories = Object.keys(data);
    const values = Object.values(data);
    const maxValue = Math.max(...values);
    const normalizedValues = values.map(val => (val / maxValue) * 100);
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [{
                label: '技能分布',
                data: normalizedValues,
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: 'rgba(37, 99, 235, 1)',
                borderWidth: 2
            }]
        }
    });
};

// 全局暴露
window.completeSkillsData = completeSkillsData;
window.initSkillsCenter = initSkillsCenter;
