// 技能数据
const skillsData = {
    "skills": [
        {
            "category": "设计",
            "skill": "UI/UX",
            "level": "中级",
            "domain": "电商平台",
            "experience": "2年"
        },
        {
            "category": "AI",
            "skill": "机器学习",
            "level": "中级",
            "domain": "预测模型",
            "experience": "1年"
        }
    ]
};

// 学习成果数据
const achievementsData = {
    "achievements": [
        {
            "date": "2025-01",
            "title": "OpenClaw 精通",
            "description": "掌握了 OpenClaw 所有核心功能",
            "projects": ["智能助手", "自动化流程"]
        }
    ]
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('技能可视化网站已加载');
    
    // 初始化雷达图占位符
    const radarContainer = document.getElementById('radar-container');
    radarContainer.innerHTML = '<div style="text-align: center; padding: 2rem;">' +
                               '<h3 style="color: #00ffff; margin-bottom: 1rem;">📊 技能雷达图</h3>' +
                               '<p style="color: #888;">使用 Chart.js 或 D3.js 实现动态雷达图</p>' +
                               '<p style="color: #666; font-size: 0.9rem; margin-top: 1rem;">' +
                               'UI/UX设计: 中级 | 机器学习: 中级</p>' +
                               '</div>';
    
    // 初始化时间线占位符
    const timelineContainer = document.getElementById('timeline-container');
    timelineContainer.innerHTML = '<div style="text-align: center; padding: 2rem;">' +
                                  '<h3 style="color: #00ffff; margin-bottom: 1rem;">⏰ 学习时间线</h3>' +
                                  '<p style="color: #888;">使用 Timeline.js 实现交互式时间线</p>' +
                                  '<div style="margin-top: 1rem; color: #00ff88;">' +
                                  '<p>📅 2025-01: OpenClaw 精通</p>' +
                                  '</div>' +
                                  '</div>';
    
    // 添加交互效果
    addInteractiveEffects();
});

// 添加交互效果
function addInteractiveEffects() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.2)';
            this.style.borderColor = '#00ffff';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        });
    });
}

// 导出数据函数（供后续图表库使用）
function getSkillsData() {
    return skillsData;
}

function getAchievementsData() {
    return achievementsData;
}