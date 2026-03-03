// 学习时间线可视化
class TimelineVisualizer {
    constructor() {
        this.timelineData = [];
    }
    
    // 初始化时间线
    initTimeline() {
        this.loadTimelineData().then(data => {
            this.timelineData = data;
            this.renderTimeline();
        });
    }
    
    // 加载时间线数据
    async loadTimelineData() {
        return [
            {
                date: "2025-01",
                title: "OpenClaw 精通",
                description: "掌握了 OpenClaw 所有核心功能",
                icon: "🚀",
                type: "milestone"
            },
            {
                date: "2025-06", 
                title: "AI技能学习",
                description: "开始学习人工智能相关技能",
                icon: "🤖",
                type: "learning"
            },
            {
                date: "2025-09",
                title: "内容创作掌握",
                description: "精通多平台内容发布技术",
                icon: "📝",
                type: "achievement"
            },
            {
                date: "2026-01",
                title: "视频生成技术",
                description: "学习 infinitetalk 视频生成",
                icon: "🎬",
                type: "learning"
            },
            {
                date: "2026-03",
                title: "技能可视化系统",
                description: "开发完整的技能展示平台",
                icon: "📊",
                type: "project"
            }
        ];
    }
    
    // 渲染时间线
    renderTimeline() {
        const container = document.getElementById('timeline-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="timeline">
                ${this.timelineData.map((item, index) => this.renderTimelineItem(item, index)).join('')}
            </div>
        `;
    }
    
    // 渲染单个时间线项目
    renderTimelineItem(item, index) {
        return `
            <div class="timeline-item ${item.type}" data-index="${index}">
                <div class="timeline-icon">${item.icon}</div>
                <div class="timeline-content">
                    <div class="timeline-date">${item.date}</div>
                    <h4 class="timeline-title">${item.title}</h4>
                    <p class="timeline-description">${item.description}</p>
                </div>
            </div>
        `;
    }
    
    // 添加新时间线项目
    addTimelineItem(item) {
        this.timelineData.push(item);
        this.timelineData.sort((a, b) => new Date(a.date) - new Date(b.date));
        this.renderTimeline();
    }
    
    // 导出时间线数据
    exportData() {
        return JSON.stringify(this.timelineData, null, 2);
    }
}

// 创建全局实例
const timeline = new TimelineVisualizer();

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', function() {
    timeline.initTimeline();
});

