// 雷达图修复工具
// 解决雷达图不显示的问题

class RadarChartFixer {
    constructor() {
        this.chart = null;
    }
    
    // 初始化雷达图
    initRadarChart() {
        console.log('初始化雷达图...');
        
        // 1. 确保Chart.js已加载
        if (typeof Chart === 'undefined') {
            console.error('Chart.js未加载');
            this.loadChartJS();
            return;
        }
        
        // 2. 创建画布元素
        this.createCanvas();
        
        // 3. 获取数据并创建图表
        this.createChartWithData();
    }
    
    // 加载Chart.js
    loadChartJS() {
        console.log('加载Chart.js...');
        
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => {
            console.log('Chart.js加载成功');
            this.createCanvas();
            this.createChartWithData();
        };
        script.onerror = () => {
            console.error('Chart.js加载失败');
            this.showFallbackUI();
        };
        
        document.head.appendChild(script);
    }
    
    // 创建画布元素
    createCanvas() {
        let container = document.getElementById('radar-container');
        if (!container) {
            console.error('找不到雷达图容器');
            return;
        }
        
        // 清空容器
        container.innerHTML = '';
        
        // 创建画布
        const canvas = document.createElement('canvas');
        canvas.id = 'skills-radar-chart';
        canvas.width = 400;
        canvas.height = 400;
        canvas.style.maxWidth = '100%';
        canvas.style.maxHeight = '100%';
        
        container.appendChild(canvas);
        console.log('画布创建成功');
    }
    
    // 创建图表数据
    createChartWithData() {
        const ctx = document.getElementById('skills-radar-chart');
        if (!ctx) {
            console.error('找不到画布元素');
            return;
        }
        
        // 模拟技能数据
        const skillsData = this.getSkillsData();
        
        const data = {
            labels: Object.keys(skillsData.byCategory),
            datasets: [{
                label: '技能分布',
                data: Object.values(skillsData.byCategory),
                backgroundColor: 'rgba(0, 255, 255, 0.2)',
                borderColor: 'rgba(0, 255, 255, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 0, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 0, 255, 1)'
            }]
        };
        
        const config = {
            type: 'radar',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e2e2e2'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#00ffff',
                        bodyColor: '#ffffff'
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
                            color: '#e2e2e2',
                            font: {
                                size: 12
                            }
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: '#888',
                            showLabelBackdrop: false
                        },
                        suggestedMin: 0,
                        suggestedMax: Math.max(...Object.values(skillsData.byCategory))
                    }
                }
            }
        };
        
        try {
            this.chart = new Chart(ctx, config);
            console.log('雷达图创建成功');
        } catch (error) {
            console.error('创建雷达图失败:', error);
            this.showFallbackUI();
        }
    }
    
    // 获取技能数据
    getSkillsData() {
        // 这里可以使用实际的数据，暂时使用模拟数据
        return {
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
        };
    }
    
    // 备用UI（如果图表失败）
    showFallbackUI() {
        const container = document.getElementById('radar-container');
        if (!container) return;
        
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h3 style="color: #00ffff; margin-bottom: 1rem;">📊 技能雷达图</h3>
                <p style="color: #888;">图表加载失败，显示统计数据：</p>
                <div style="margin-top: 1rem; color: #ccc;">
                    <p>🎨 设计与前端: 8项技能</p>
                    <p>📝 内容创作: 6项技能</p>
                    <p>🎬 视频制作: 14项技能</p>
                    <p>🤖 人工智能: 3项技能</p>
                    <p>🛠️ 工具开发: 28项技能</p>
                </div>
                <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #2563eb; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    重新加载图表
                </button>
            </div>
        `;
    }
}

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', function() {
    const fixer = new RadarChartFixer();
    fixer.initRadarChart();
});

// 全局可用
window.RadarChartFixer = RadarChartFixer;