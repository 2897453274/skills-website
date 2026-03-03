// 技能详情查看器
class SkillsDetailsViewer {
    constructor() {
        this.currentCategory = 'all';
        this.skillsData = [];
        this.modal = null;
    }
    
    // 初始化详情查看器
    async init() {
        await this.loadSkillsData();
        this.renderSkillsGrid();
        this.setupCategoryFilter();
        this.createModal();
    }
    
    // 加载技能数据
    async loadSkillsData() {
        try {
            // 从技能数据文件获取
            if (typeof OpenClawSkills !== 'undefined') {
                this.skillsData = OpenClawSkills.getSkillsData().skills;
            } else {
                // 默认数据
                this.skillsData = [
                    {
                        category: "设计与前端",
                        skill: "前端设计与开发",
                        level: "高级",
                        experience: "2年",
                        description: "创建响应式网站，优化用户体验，实现现代Web设计",
                        usage: "使用HTML5、CSS3、JavaScript创建响应式界面"
                    },
                    {
                        category: "内容创作", 
                        skill: "多平台内容发布",
                        level: "高级",
                        experience: "2年",
                        description: "微信公众号、X/Twitter等多平台内容发布",
                        usage: "集成各平台API实现自动化发布"
                    }
                ];
            }
        } catch (error) {
            console.error('加载技能数据失败:', error);
        }
    }
    
    // 渲染技能网格
    renderSkillsGrid() {
        const container = document.getElementById('skills-list');
        if (!container) return;
        
        const filteredSkills = this.currentCategory === 'all' 
            ? this.skillsData 
            : this.skillsData.filter(skill => skill.category === this.currentCategory);
        
        container.innerHTML = `
            <div class="skills-header">
                <h3>技能详情</h3>
                <div class="category-filter">
                    <select id="category-select">
                        <option value="all">所有分类</option>
                        <option value="设计与前端">设计与前端</option>
                        <option value="内容创作">内容创作</option>
                        <option value="视频制作">视频制作</option>
                        <option value="人工智能">人工智能</option>
                        <option value="工具开发">工具开发</option>
                        <option value="即时通讯">即时通讯</option>
                    </select>
                </div>
            </div>
            <div class="skills-grid">
                ${filteredSkills.map((skill, index) => this.renderSkillCard(skill, index)).join('')}
            </div>
        `;
        
        // 添加点击事件
        this.addSkillCardListeners();
    }
    
    // 渲染技能卡片
    renderSkillCard(skill, index) {
        return `
            <div class="skill-card" data-index="${index}" data-category="${skill.category}">
                <div class="skill-header">
                    <h4>${skill.skill}</h4>
                    <span class="skill-level ${skill.level}">${skill.level}</span>
                </div>
                <div class="skill-category">${skill.category}</div>
                <div class="skill-experience">经验: ${skill.experience}</div>
                <p class="skill-description">${skill.description}</p>
                <button class="view-details-btn">查看详情</button>
            </div>
        `;
    }
    
    // 设置分类过滤器
    setupCategoryFilter() {
        setTimeout(() => {
            const select = document.getElementById('category-select');
            if (select) {
                select.value = this.currentCategory;
                select.addEventListener('change', (e) => {
                    this.currentCategory = e.target.value;
                    this.renderSkillsGrid();
                });
            }
        }, 100);
    }
    
    // 添加技能卡片监听器
    addSkillCardListeners() {
        setTimeout(() => {
            const cards = document.querySelectorAll('.skill-card');
            cards.forEach(card => {
                card.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('view-details-btn')) {
                        const index = card.getAttribute('data-index');
                        this.showSkillDetails(this.skillsData[index]);
                    }
                });
            });
            
            const buttons = document.querySelectorAll('.view-details-btn');
            buttons.forEach((button, index) => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const card = button.closest('.skill-card');
                    const cardIndex = card.getAttribute('data-index');
                    this.showSkillDetails(this.skillsData[cardIndex]);
                });
            });
        }, 100);
    }
    
    // 创建模态框
    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'skill-modal';
        this.modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(this.modal);
        
        // 关闭事件
        this.modal.querySelector('.close-modal').addEventListener('click', () => {
            this.hideModal();
        });
        
        // 点击背景关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
    }
    
    // 显示技能详情
    showSkillDetails(skill) {
        const modalBody = this.modal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="skill-detail-header">
                <h2>${skill.skill}</h2>
                <span class="detail-level ${skill.level}">${skill.level}</span>
            </div>
            <div class="skill-meta">
                <div class="meta-item">
                    <strong>分类:</strong> ${skill.category}
                </div>
                <div class="meta-item">
                    <strong>经验:</strong> ${skill.experience}
                </div>
            </div>
            <div class="skill-description-full">
                <h4>技能描述</h4>
                <p>${skill.description}</p>
            </div>
            ${skill.usage ? `
            <div class="skill-usage">
                <h4>使用方法</h4>
                <p>${skill.usage}</p>
            </div>
            ` : ''}
            <div class="skill-actions">
                <button class="btn-primary">应用此技能</button>
                <button class="btn-secondary">学习资源</button>
            </div>
        `;
        
        this.modal.style.display = 'block';
    }
    
    // 隐藏模态框
    hideModal() {
        this.modal.style.display = 'none';
    }
    
    // 搜索技能
    searchSkills(query) {
        const results = this.skillsData.filter(skill =>
            skill.skill.toLowerCase().includes(query.toLowerCase()) ||
            skill.description.toLowerCase().includes(query.toLowerCase()) ||
            skill.category.toLowerCase().includes(query.toLowerCase())
        );
        
        return results;
    }
}

// 创建全局实例
const skillsViewer = new SkillsDetailsViewer();

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', function() {
    skillsViewer.init();
});

export { skillsViewer };