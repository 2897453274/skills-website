// 技能雷达图生成器
class RadarChartGenerator {
    constructor() {
        this.chart = null;
        this.skillData = null;
    }
    
    // 初始化雷达图
    initRadarChart() {
        const ctx = document.getElementById('radar-chart-canvas');
        if (!ctx) {
            console.error('找不到雷达图画布');
            return;
        }
        
        // 获取技能数据
        this.loadSkillData().then(data => {
            this.skillData = data;
            this.createChart(ctx);
        });
    }
    
    // 加载技能数据
    async loadSkillData() {
        try {
            // 从skills-data.js获取数据
            if (typeof OpenClawSkills !== 'undefined') {
                return OpenClawSkills.getSkillsData();
            }
            
            // 备用数据
            return {
                statistics: {
                    byCategory: {
                        "设计与前端": 8,
                        "内容创作": 9,
                        "视频制作": 14,
                        "人工智能": 11,
                        "工具开发": 16,
                        "即时通讯": 2
                    },
                    byLevel: {
                        "高级": 28,
                        "中级": 32,
                        "初级": 5
                    }
                }
            };
        } catch (error) {
            console.error('加载技能数据失败:', error);
            return this.getDefaultData();
        }
    }
    
    // 默认数据
    getDefaultData() {
        return {
            statistics: {
                byCategory: {
                    "设计与前端": 8,
                    "内容创作": 6,
                    "视频制作": 14,
                    "人工智能": 3,
                    "工具开发": 28
                }
            }
        };
    }
    
    // 创建雷达图
    createChart(ctx) {
        if (!this.skillData) {
            console.error('没有技能数据');
            return;
        }
        
        const categories = Object.keys(this.skillData.statistics.byCategory);
        const values = Object.values(this.skillData.statistics.byCategory);
        
        // 标准化数据（0-100）
        const maxValue = Math.max(...values);
        const normalizedValues = values.map(val => (val / maxValue) * 100);
        
        const data = {
            labels: categories,
            datasets: [{
                label: '技能分布',
                data: normalizedValues,
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
                        bodyColor: '#ffffff',
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
                        suggestedMax: 100
                    }
                }
            }
        };
        
        this.chart = new Chart(ctx, config);
    }
    
    // 更新雷达图数据
    updateChart(newData) {
        if (this.chart && newData) {
            const categories = Object.keys(newData.statistics.byCategory);
            const values = Object.values(newData.statistics.byCategory);
            
            const maxValue = Math.max(...values);
            const normalizedValues = values.map(val => (val / maxValue) * 100);
            
            this.chart.data.labels = categories;
            this.chart.data.datasets[0].data = normalizedValues;
            this.chart.update();
        }
    }
    
    // 销毁图表
    destroy() {
        if (this.chart) {
            this.chart.destroy();
        }
    }
}

// 创建全局实例
const radarChart = new RadarChartGenerator();

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 创建画布元素
    const radarContainer = document.getElementById('radar-container');
    if (radarContainer) {
        radarContainer.innerHTML = '<canvas id="radar-chart-canvas" width="400" height="400"></canvas>';
        radarChart.initRadarChart();
    }
});

// 导出供其他脚本使用
export { radarChart };