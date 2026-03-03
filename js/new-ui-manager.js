// 新UI管理器 - 控制完整的技能展示界面
import { completeSkillsData } from './new-skills-data.js';

class NewUIManager {
    constructor() {
        this.skillsData = completeSkillsData;
        this.currentCategory = 'all';
        this.init();
    }
    
    // 初始化
    init() {
        this.renderAllSkills();
        this.setupCategoryFilters();
        this.setupRadarChart();
        this.setupSkillCardInteractions();
        this.animateElements();
    }
    
    // 渲染所有技能
    renderAllSkills() {
        const container = document.getElementById('skills-container');
        if (!container) return;
        
        const filteredSkills = this.currentCategory === 'all' 
            ? this.skillsData.skills 
            : this.skillsData.skills.filter(skill => skill.category === this.currentCategory);
        
        container.innerHTML = filteredSkills.map(skill => this.createSkillCard(skill)).join('');
    }
    
    // 创建技能卡片
    createSkillCard(skill) {
        const levelClass = this.getLevelClass(skill.level);
        
        return `
            <div class="skill-card animate-in" data-skill-id="${skill.id}">
                <div class="skill-header">
                    <h3>${skill.name}</h3>
                    <span class="skill-level ${levelClass}">${skill.level}</span>
                </div>
                
                <div class="skill-category">
                    <i class="${skill.icon}"></i>
                    ${skill.category}
                </div>
                
                <div class="skill-description">
                    ${skill.description}
                </div>
                
                <div class="skill-meta">
                    <span>经验: ${skill.experience}</span>
                    <div class="skill-tags">
                        ${skill.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    // 获取等级对应的CSS类
    getLevelClass(level) {
        const levelMap = {
            '高级': 'level-high',
            '中级': 'level-medium',
            '初级': 'level-low'
        };
        return levelMap[level] || 'level-medium';
    }
    
    // 设置分类过滤器
    setupCategoryFilters() {
        const buttons = document.querySelectorAll('.category-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // 移除所有active类
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // 添加active类到当前按钮
                button.classList.add('active');
                
                // 更新当前分类
                this.currentCategory = button.getAttribute('data-category');
                
                // 重新渲染技能
                this.renderAllSkills();
                
                // 更新雷达图
                this.updateRadarChart();
            });
        });
    }
    
    // 设置雷达图
    setupRadarChart() {
        const ctx = document.getElementById('skills-radar');
        if (!ctx) return;
        
        this.radarChart = new Chart(ctx, this.getRadarConfig());
    }
    
    // 获取雷达图配置
    getRadarConfig() {
        const categories = Object.keys(this.skillsData.statistics.byCategory);
        const values = Object.values(this.skillsData.statistics.byCategory);
        
        // 标准化数据
        const maxValue = Math.max(...values);
        const normalizedValues = values.map(val => (val / maxValue) * 100);
        
        return {
            type: 'radar',
            data: {
                labels: categories,
                datasets: [{
                    label: '技能分布',
                    data: normalizedValues,
                    backgroundColor: 'rgba(37, 99, 235, 0.2)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(124, 58, 237, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(124, 58, 237, 1)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e2e8f0'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        titleColor: '#0ea5e9',
                        bodyColor: '#e2e8f0',
                        callbacks: {
                            label: (context) => {
                                const label = context.dataset.label || '';
                                const value = context.raw;
                                const actualValue = values[context.dataIndex];
                                return `${label}: ${actualValue}项技能 (${Math.round(value)}%)`;
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#e2e8f0',
                            font: {
                                size: 12
                            }
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: '#64748b',
                            showLabelBackdrop: false
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        };
    }
    
    // 更新雷达图
    updateRadarChart() {
        if (!this.radarChart) return;
        
        let filteredData;
        if (this.currentCategory === 'all') {
            filteredData = this.skillsData.statistics.byCategory;
        } else {
            // 对于单个分类，突出显示该分类
            filteredData = Object.keys(this.skillsData.statistics.byCategory).reduce((acc, category) => {
                acc[category] = category === this.currentCategory ? 
                    this.skillsData.statistics.byCategory[category] : 10; // 其他分类显示较小值
                return acc;
            }, {});
        }
        
        const categories = Object.keys(filteredData);
        const values = Object.values(filteredData);
        const maxValue = Math.max(...values);
        const normalizedValues = values.map(val => (val / maxValue) * 100);
        
        this.radarChart.data.labels = categories;
        this.radarChart.data.datasets[0].data = normalizedValues;
        this.radarChart.update();
    }
    
    // 设置技能卡片交互
    setupSkillCardInteractions() {
        document.addEventListener('click', (e) => {
            const skillCard = e.target.closest('.skill-card');
            if (skillCard) {
                const skillId = skillCard.getAttribute('data-skill-id');
                this.showSkillDetails(skillId);
            }
        });
    }
    
    // 显示技能详情
    showSkillDetails(skillId) {
        const skill = this.skillsData.skills.find(s => s.id === skillId);
        if (!skill) return;
        
        // 创建详情模态框
        this.createDetailModal(skill);
    }
    
    // 创建详情模态框
    createDetailModal(skill) {
        // 移除现有的模态框
        this.removeExistingModal();
        
        const modal = document.createElement('div');
        modal.className = 'skill-detail-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                
                <div class="modal-header">
                    <div class="skill-icon">
                        <i class="${skill.icon}"></i>
                    </div>
                    <div class="skill-title">
                        <h2>${skill.name}</h2>
                        <span class="skill-level ${this.getLevelClass(skill.level)}">${skill.level}</span>
                    </div>
                </div>
                
                <div class="modal-body">
                    <div class="skill-info">
                        <div class="info-item">
                            <label>分类:</label>
                            <span>${skill.category}</span>
                        </div>
                        <div class="info-item">
                            <label>经验:</label>
                            <span>${skill.experience}</span>
                        </div>
                        <div class="info-item">
                            <label>标签:</label>
                            <div class="tags">
                                ${skill.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="skill-description">
                        <h4>技能描述</h4>
                        <p>${skill.description}</p>
                    </div>
                    
                    <div class="skill-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-play"></i>
                            应用此技能
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-book"></i>
                            学习资源
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 添加关闭事件
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // 显示模态框
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
    
    // 移除现有的模态框
    removeExistingModal() {
        const existingModal = document.querySelector('.skill-detail-modal');
        if (existingModal) {
            existingModal.remove();
        }
    }
    
    // 动画效果
    animateElements() {
        const elements = document.querySelectorAll('.animate-in');
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // 获取统计数据
    getStats() {
        return this.skillsData.statistics;
    }
    
    // 搜索技能
    searchSkills(query) {
        return this.skillsData.skills.filter(skill =>
            skill.name.toLowerCase().includes(query.toLowerCase()) ||
            skill.description.toLowerCase().includes(query.toLowerCase()) ||
            skill.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
    }
}

// 添加模态框样式
const modalStyles = `
<style>
    .skill-detail-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal-content {
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        border-radius: 16px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        border: 1px solid rgba(255, 255, 255, 0.1);
        position: relative;
    }
    
    .close-modal {
        position: absolute;
        right: 1rem;
        top: 1rem;
        font-size: 1.5rem;
        color: #64748b;
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .close-modal:hover {
        color: #0ea5e9;
    }
    
    .modal-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .skill-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #2563eb, #7c3aed);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: white;
    }
    
    .skill-title h2 {
        color: white;
        margin-bottom: 0.5rem;
    }
    
    .skill-info {
        margin-bottom: 2rem;
    }
    
    .info-item {
        display: flex;
        justify-content: space-between;
        padding: 0.8rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .info-item:last-child {
        border-bottom: none;
    }
    
    .info-item label {
        color: #64748b;
        font-weight: 500;
    }
    
    .info-item span {
        color: #e2e8f0;
    }
    
    .tags {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    .tag {
        background: rgba(37, 99, 235, 0.2);
        color: #2563eb;
        padding: 0.3rem 0.8rem;
        border-radius: 12px;
        font-size: 0.8rem;
        border: 1px solid rgba(37, 99, 235, 0.3);
    }
    
    .skill-description h4 {
        color: #0ea5e9;
        margin-bottom: 0.5rem;
    }
    
    .skill-description p {
        color: #94a3b8;
        line-height: 1.6;
    }
    
    .skill-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .btn {
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
    }
    
    .btn-primary {
        background: linear-gradient(45deg, #2563eb, #7c3aed);
        color: white;
    }
    
    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 20px rgba(37, 99, 235, 0.3);
    }
    
    .btn-secondary {
        background: rgba(255, 255, 255, 0.1);
        color: #e2e8f0;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.2);
    }
</style>
`;

// 添加样式到文档
document.head.insertAdjacentHTML('beforeend', modalStyles);

// 创建UI管理器实例
document.addEventListener('DOMContentLoaded', function() {
    window.uiManager = new NewUIManager();
});

export { NewUIManager };