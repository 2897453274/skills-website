// 技能管理器 - 用于添加和管理新技能
class SkillManager {
    constructor() {
        this.skills = [];
        this.categories = [
            '设计与前端', '内容创作', '视频制作', 
            '人工智能', '工具开发', '即时通讯'
        ];
        this.levels = ['初级', '中级', '高级'];
    }
    
    // 初始化
    async init() {
        await this.loadSkills();
        this.setupEventListeners();
    }
    
    // 加载技能数据
    async loadSkills() {
        try {
            const response = await fetch('./skills-inventory.json');
            const data = await response.json();
            this.skills = data.skillDetails ? Object.values(data.skillDetails) : [];
        } catch (error) {
            console.warn('无法加载技能数据，使用默认数据');
            this.skills = [];
        }
    }
    
    // 设置事件监听
    setupEventListeners() {
        // 在实际应用中，这里会设置表单提交等事件
        console.log('技能管理器事件监听已设置');
    }
    
    // 添加新技能
    async addSkill(skillData) {
        const newSkill = {
            id: this.generateId(),
            ...skillData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.skills.push(newSkill);
        await this.saveSkills();
        
        return newSkill;
    }
    
    // 更新技能
    async updateSkill(skillId, updates) {
        const index = this.skills.findIndex(skill => skill.id === skillId);
        if (index !== -1) {
            this.skills[index] = {
                ...this.skills[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            await this.saveSkills();
            return this.skills[index];
        }
        return null;
    }
    
    // 删除技能
    async deleteSkill(skillId) {
        const index = this.skills.findIndex(skill => skill.id === skillId);
        if (index !== -1) {
            const deleted = this.skills.splice(index, 1)[0];
            await this.saveSkills();
            return deleted;
        }
        return null;
    }
    
    // 保存技能数据
    async saveSkills() {
        try {
            // 在实际应用中，这里会保存到文件或数据库
            const data = {
                lastUpdated: new Date().toISOString(),
                totalSkills: this.skills.length,
                skills: this.skills
            };
            
            console.log('技能数据已保存', data);
            return true;
        } catch (error) {
            console.error('保存技能数据失败:', error);
            return false;
        }
    }
    
    // 生成唯一ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    // 搜索技能
    searchSkills(query) {
        const lowerQuery = query.toLowerCase();
        return this.skills.filter(skill =>
            skill.skill?.toLowerCase().includes(lowerQuery) ||
            skill.category?.toLowerCase().includes(lowerQuery) ||
            skill.description?.toLowerCase().includes(lowerQuery)
        );
    }
    
    // 按分类获取技能
    getSkillsByCategory(category) {
        return this.skills.filter(skill => skill.category === category);
    }
    
    // 按等级获取技能
    getSkillsByLevel(level) {
        return this.skills.filter(skill => skill.level === level);
    }
    
    // 获取统计信息
    getStatistics() {
        const byCategory = {};
        const byLevel = { 初级: 0, 中级: 0, 高级: 0 };
        
        this.skills.forEach(skill => {
            // 分类统计
            if (skill.category) {
                byCategory[skill.category] = (byCategory[skill.category] || 0) + 1;
            }
            
            // 等级统计
            if (skill.level && byLevel.hasOwnProperty(skill.level)) {
                byLevel[skill.level]++;
            }
        });
        
        return {
            totalCount: this.skills.length,
            byCategory,
            byLevel
        };
    }
}

// 创建技能管理器实例
const skillManager = new SkillManager();

// 初始化技能管理器
document.addEventListener('DOMContentLoaded', async () => {
    await skillManager.init();
    console.log('技能管理器初始化完成');
});

// 导出供其他脚本使用
export { skillManager };