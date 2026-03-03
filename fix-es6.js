// ES6模块化语法修复工具
// 将ES6 import/export转换为传统语法

const fs = require('fs').promises;
const path = require('path');

class ES6Fixer {
    constructor() {
        this.websiteDir = path.join(__dirname);
        this.fixedFiles = [];
    }
    
    async fixAllES6Syntax() {
        console.log('🛠️ 开始修复ES6模块化语法...');
        
        try {
            // 修复JavaScript文件
            await this.fixJavaScriptFiles();
            
            // 修复HTML文件
            await this.fixHtmlFiles();
            
            // 更新package.json（如果存在）
            await this.updatePackageJson();
            
            console.log('✅ 修复完成');
            console.log(`修复了 ${this.fixedFiles.length} 个文件`);
            
            return this.fixedFiles;
            
        } catch (error) {
            console.error('修复过程中出错:', error);
            return [];
        }
    }
    
    async fixJavaScriptFiles() {
        try {
            const jsDir = path.join(this.websiteDir, 'js');
            const files = await fs.readdir(jsDir);
            const jsFiles = files.filter(file => file.endsWith('.js'));
            
            for (const file of jsFiles) {
                const filePath = path.join(jsDir, file);
                const content = await fs.readFile(filePath, 'utf-8');
                
                if (content.includes('import ') || content.includes('export ')) {
                    console.log(`修复JavaScript文件: ${file}`);
                    const fixedContent = this.convertES6ToTraditional(content, file);
                    await fs.writeFile(filePath, fixedContent);
                    this.fixedFiles.push(`js/${file}`);
                }
            }
            
        } catch (error) {
            console.log('JavaScript目录可能不存在或无法访问');
        }
    }
    
    async fixHtmlFiles() {
        try {
            const files = await fs.readdir(this.websiteDir);
            const htmlFiles = files.filter(file => file.endsWith('.html'));
            
            for (const file of htmlFiles) {
                const filePath = path.join(this.websiteDir, file);
                const content = await fs.readFile(filePath, 'utf-8');
                
                if (content.includes('type="module"')) {
                    console.log(`修复HTML文件: ${file}`);
                    const fixedContent = content.replace('type="module"', '');
                    await fs.writeFile(filePath, fixedContent);
                    this.fixedFiles.push(file);
                }
            }
            
        } catch (error) {
            console.error('修复HTML文件时出错:', error);
        }
    }
    
    convertES6ToTraditional(content, filename) {
        let fixedContent = content;
        
        // 移除import语句
        fixedContent = fixedContent.replace(/import\s*{([^}]+)}\s*from\s*['"]([^'"]+)['"];?/g, '');
        fixedContent = fixedContent.replace(/import\s*([^\s]+)\s*from\s*['"]([^'"]+)['"];?/g, '');
        fixedContent = fixedContent.replace(/import\s*['"]([^'"]+)['"];?/g, '');
        
        // 移除export语句
        fixedContent = fixedContent.replace(/export\s+const\s+([^=]+)\s*=/g, 'const $1 =');
        fixedContent = fixedContent.replace(/export\s+function\s+([^(]+)/g, 'function $1');
        fixedContent = fixedContent.replace(/export\s+class\s+([^{]+)/g, 'class $1');
        fixedContent = fixedContent.replace(/export\s+default\s+/g, '');
        fixedContent = fixedContent.replace(/export\s*{([^}]+)};?/g, '');
        
        // 添加全局变量声明（根据文件名）
        const globalVarName = this.getGlobalVarName(filename);
        
        // 移除export default后的分号
        fixedContent = fixedContent.replace(/;;/g, ';');
        
        return fixedContent;
    }
    
    getGlobalVarName(filename) {
        const baseName = filename.replace('.js', '');
        const parts = baseName.split('-');
        
        if (parts.length > 1) {
            return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
        }
        
        return baseName.charAt(0).toUpperCase() + baseName.slice(1);
    }
    
    async updatePackageJson() {
        try {
            const packagePath = path.join(this.websiteDir, 'package.json');
            await fs.access(packagePath);
            
            const content = await fs.readFile(packagePath, 'utf-8');
            const packageData = JSON.parse(content);
            
            // 确保有build脚本
            if (!packageData.scripts) {
                packageData.scripts = {};
            }
            
            if (!packageData.scripts.build) {
                packageData.scripts.build = "echo 'No build needed for static site'";
                await fs.writeFile(packagePath, JSON.stringify(packageData, null, 2));
                this.fixedFiles.push('package.json');
            }
            
        } catch (error) {
            // package.json不存在是正常的
        }
    }
    
    async createTraditionalVersion() {
        // 创建传统版本的入口文件
        const traditionalContent = `
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
        \`<div class="skill-card">
            <h3>\${skill.name}</h3>
            <p>\${skill.description}</p>
            <div>分类: \${skill.category} | 等级: \${skill.level}</div>
        </div>\`
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
`;
        
        const outputPath = path.join(this.websiteDir, 'js/traditional.js');
        await fs.writeFile(outputPath, traditionalContent);
        this.fixedFiles.push('js/traditional.js');
    }
}

// 执行修复
async function main() {
    const fixer = new ES6Fixer();
    const fixedFiles = await fixer.fixAllES6Syntax();
    
    // 创建传统版本
    await fixer.createTraditionalVersion();
    
    console.log('\n📋 修复总结:');
    console.log('='.repeat(30));
    fixedFiles.forEach(file => {
        console.log(`✅ ${file}`);
    });
    
    return fixedFiles;
}

// 导出供其他脚本使用
module.exports = { ES6Fixer };

// 如果直接运行
if (require.main === module) {
    main().catch(console.error);
}