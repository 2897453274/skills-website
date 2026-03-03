// 导入完整技能数据
import { getSkillsData } from './skills-data.js';

// 技能数据
const skillsData = getSkillsData();

// 学习成果数据
const achievementsData = {
    "achievements": [
        {
            "date": "2025-01",
            "title": "OpenClaw 精通",
            "description": "掌握了 OpenClaw 所有核心功能",
            "projects": ["智能助手", "自动化流程"]
        },
        {
            "date": "2026-03",
            "title": "技能可视化系统",
            "description": "开发了完整的技能展示和管理系统",
            "projects": ["GitHub Pages部署", "响应式设计"]
        }
    ]
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('技能可视化网站已加载');
    
    // 显示技能统计信息
    displaySkillsStatistics();
    
    // 初始化雷达图占位符
    const radarContainer = document.getElementById('radar-container');
    radarContainer.innerHTML = '<div style="text-align: center; padding: 2rem;">' +
                               '<h3 style="color: #00ffff; margin-bottom: 1rem;">📊 技能雷达图</h3>' +
                               '<p style="color: #888;">展示65个技能的分类分布</p>' +
                               '<p style="color: #666; font-size: 0.9rem; margin-top: 1rem;">' +
                               '设计开发: 8项 | 内容创作: 9项 | 视频制作: 14项</p>' +
                               '</div>';
    
    // 初始化时间线占位符
    const timelineContainer = document.getElementById('timeline-container');
    timelineContainer.innerHTML = '<div style="text-align: center; padding: 2rem;">' +
                                  '<h3 style="color: #00ffff; margin-bottom: 1rem;">⏰ 学习时间线</h3>' +
                                  '<p style="color: #888;">技能发展与学习历程</p>' +
                                  '<div style="margin-top: 1rem; color: #00ff88;">' +
                                  '<p>📅 2025-01: OpenClaw 精通</p>' +
                                  '<p>📅 2026-03: 技能可视化系统</p>' +
                                  '</div>' +
                                  '</div>';
    
    // 添加交互效果
    addInteractiveEffects();
});

// 显示技能统计信息
function displaySkillsStatistics() {
    const stats = skillsData.statistics;
    const skillsList = document.getElementById('skills-list');
    
    if (skillsList) {
        skillsList.innerHTML += `
            <div class="statistics-card">
                <h3>📈 技能统计</h3>
                <p><strong>总技能数:</strong> ${stats.totalCount}项</p>
                <p><strong>高级技能:</strong> ${stats.byLevel.高级}项</p>
                <p><strong>中级技能:</strong> ${stats.byLevel.中级}项</p>
                <div class="category-stats">
                    <h4>分类分布:</h4>
                    <p>🎨 设计与前端: ${stats.byCategory['设计与前端']}项</p>
                    <p>📝 内容创作: ${stats.byCategory['内容创作']}项</p>
                    <p>🎬 视频制作: ${stats.byCategory['视频制作']}项</p>
                    <p>🤖 人工智能: ${stats.byCategory['人工智能']}项</p>
                    <p>🛠️ 工具开发: ${stats.byCategory['工具开发']}项</p>
                    <p>💬 即时通讯: ${stats.byCategory['即时通讯']}项</p>
                </div>
            </div>
        `;
    }
}

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