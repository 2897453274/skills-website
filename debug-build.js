// GitHub Actions构建调试工具
// 用于分析和解决构建失败问题

const fs = require('fs').promises;
const path = require('path');

class BuildDebugger {
    constructor() {
        this.websiteDir = path.join(__dirname);
        this.issues = [];
    }
    
    async diagnoseBuildIssues() {
        console.log('🔍 开始诊断构建问题...');
        
        try {
            // 1. 检查package.json
            await this.checkPackageJson();
            
            // 2. 检查工作流文件
            await this.checkWorkflowFile();
            
            // 3. 检查HTML文件
            await this.checkHtmlFiles();
            
            // 4. 检查JavaScript文件
            await this.checkJavaScriptFiles();
            
            // 5. 检查静态资源
            await this.checkStaticAssets();
            
            // 输出诊断结果
            this.reportDiagnostics();
            
            return this.issues;
            
        } catch (error) {
            console.error('诊断过程中出错:', error);
            return [];
        }
    }
    
    async checkPackageJson() {
        try {
            const packagePath = path.join(this.websiteDir, 'package.json');
            await fs.access(packagePath);
            
            const packageContent = await fs.readFile(packagePath, 'utf-8');
            const packageData = JSON.parse(packageContent);
            
            // 检查必要的脚本
            if (!packageData.scripts || !packageData.scripts.build) {
                this.issues.push({
                    type: 'package.json',
                    severity: 'high',
                    message: '缺少build脚本',
                    suggestion: '添加构建脚本: "build": "echo \"No build needed\""'
                });
            }
            
        } catch (error) {
            // package.json不存在是正常的
        }
    }
    
    async checkWorkflowFile() {
        try {
            const workflowPath = path.join(this.websiteDir, '.github', 'workflows', 'deploy.yml');
            const workflowContent = await fs.readFile(workflowPath, 'utf-8');
            
            // 检查工作流配置
            if (!workflowContent.includes('pages-build-deployment')) {
                this.issues.push({
                    type: 'workflow',
                    severity: 'medium',
                    message: '可能不是标准Pages工作流',
                    suggestion: '检查GitHub Pages工作流配置'
                });
            }
            
        } catch (error) {
            this.issues.push({
                type: 'workflow',
                severity: 'high',
                message: '无法读取工作流文件',
                suggestion: '检查.github/workflows/deploy.yml文件是否存在'
            });
        }
    }
    
    async checkHtmlFiles() {
        try {
            const files = await fs.readdir(this.websiteDir);
            const htmlFiles = files.filter(file => file.endsWith('.html'));
            
            for (const file of htmlFiles) {
                const content = await fs.readFile(path.join(this.websiteDir, file), 'utf-8');
                
                // 检查模块化语法
                if (content.includes('import {') || content.includes('export const')) {
                    this.issues.push({
                        type: 'html',
                        severity: 'high',
                        message: `文件 ${file} 包含ES6模块化语法`,
                        suggestion: '移除import/export语法，使用传统script标签'
                    });
                }
                
                // 检查外部资源
                if (content.includes('cdn.jsdelivr.net') || content.includes('cdnjs.cloudflare.com')) {
                    this.issues.push({
                        type: 'html',
                        severity: 'medium',
                        message: `文件 ${file} 使用CDN资源`,
                        suggestion: '确保CDN链接正确，考虑使用本地资源'
                    });
                }
            }
            
        } catch (error) {
            console.error('检查HTML文件时出错:', error);
        }
    }
    
    async checkJavaScriptFiles() {
        try {
            const jsDir = path.join(this.websiteDir, 'js');
            const files = await fs.readdir(jsDir);
            const jsFiles = files.filter(file => file.endsWith('.js'));
            
            for (const file of jsFiles) {
                const content = await fs.readFile(path.join(jsDir, file), 'utf-8');
                
                // 检查ES6模块语法
                if (content.includes('import ') || content.includes('export ')) {
                    this.issues.push({
                        type: 'javascript',
                        severity: 'high',
                        message: `文件 js/${file} 使用ES6模块语法`,
                        suggestion: '改用传统JavaScript语法，使用全局变量'
                    });
                }
                
                // 检查严格模式
                if (content.includes('\"use strict\"')) {
                    this.issues.push({
                        type: 'javascript',
                        severity: 'low',
                        message: `文件 js/${file} 使用严格模式`,
                        suggestion: '严格模式通常没问题，但可以检查兼容性'
                    });
                }
            }
            
        } catch (error) {
            // JS目录可能不存在
        }
    }
    
    async checkStaticAssets() {
        try {
            const cssDir = path.join(this.websiteDir, 'css');
            await fs.access(cssDir);
            
            const files = await fs.readdir(cssDir);
            const cssFiles = files.filter(file => file.endsWith('.css'));
            
            for (const file of cssFiles) {
                const content = await fs.readFile(path.join(cssDir, file), 'utf-8');
                
                // 检查现代CSS特性
                if (content.includes('grid') || content.includes('flexbox') || content.includes('var(--')) {
                    this.issues.push({
                        type: 'css',
                        severity: 'low',
                        message: `文件 css/${file} 使用现代CSS特性`,
                        suggestion: '确保浏览器兼容性，添加前缀如果 needed'
                    });
                }
            }
            
        } catch (error) {
            // CSS目录可能不存在
        }
    }
    
    reportDiagnostics() {
        console.log('\n📊 构建问题诊断报告');
        console.log('='.repeat(50));
        
        if (this.issues.length === 0) {
            console.log('✅ 未发现明显问题');
            console.log('建议检查GitHub Actions的详细日志');
            return;
        }
        
        // 按严重程度排序
        const sortedIssues = this.issues.sort((a, b) => {
            const severityOrder = { high: 3, medium: 2, low: 1 };
            return severityOrder[b.severity] - severityOrder[a.severity];
        });
        
        sortedIssues.forEach((issue, index) => {
            const emoji = issue.severity === 'high' ? '❌' : issue.severity === 'medium' ? '⚠️' : 'ℹ️';
            console.log(`\n${emoji} 问题 ${index + 1}:`);
            console.log(`   类型: ${issue.type}`);
            console.log(`   严重程度: ${issue.severity}`);
            console.log(`   描述: ${issue.message}`);
            console.log(`   建议: ${issue.suggestion}`);
        });
        
        console.log('\n🎯 建议操作:');
        console.log('1. 查看GitHub Actions详细日志');
        console.log('2. 逐步移除ES6模块化语法');
        console.log('3. 测试简化版HTML文件');
        console.log('4. 检查工作流配置');
    }
    
    async generateFixPatch() {
        const fixes = [];
        
        // 生成修复建议
        this.issues.forEach(issue => {
            if (issue.severity === 'high') {
                fixes.push({
                    file: issue.type === 'javascript' ? 'js文件' : 'html文件',
                    action: '移除ES6模块化语法',
                    priority: '高'
                });
            }
        });
        
        return fixes;
    }
}

// 执行诊断
async function main() {
    const buildDebugger = new BuildDebugger();
    await buildDebugger.diagnoseBuildIssues();
    
    const fixes = await buildDebugger.generateFixPatch();
    return { issues: buildDebugger.issues, fixes };
}

// 导出供其他脚本使用
module.exports = { BuildDebugger };

// 如果直接运行
if (require.main === module) {
    main().catch(console.error);
}