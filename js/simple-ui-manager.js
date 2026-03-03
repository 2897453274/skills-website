// Simple UI Manager - Non-module version for GitHub Pages compatibility
class SimpleUIManager {
    constructor(skillsData) {
        this.skillsData = skillsData;
        this.currentCategory = 'all';
    }
    
    init() {
        console.log('Simple UI Manager initialized with', this.skillsData.totalSkills, 'skills');
        this.renderAllSkills();
        this.setupCategoryFilters();
    }
    
    renderAllSkills() {
        const container = document.getElementById('skills-container');
        if (!container) return;
        
        const filteredSkills = this.currentCategory === 'all' 
            ? this.skillsData.skills 
            : this.skillsData.skills.filter(skill => skill.category === this.currentCategory);
        
        container.innerHTML = filteredSkills.map(skill => this.createSkillCard(skill)).join('');
    }
    
    createSkillCard(skill) {
        return `
            <div class="skill-card animate-in" data-skill-id="${skill.id}">
                <div class="skill-header">
                    <h3>${skill.name}</h3>
                    <span class="skill-level">${skill.level}</span>
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
    
    setupCategoryFilters() {
        const buttons = document.querySelectorAll('.category-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.currentCategory = button.getAttribute('data-category');
                this.renderAllSkills();
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.completeSkillsData) {
        window.uiManager = new SimpleUIManager(window.completeSkillsData);
        window.uiManager.init();
    } else {
        console.error('Skills data not found');
    }
});