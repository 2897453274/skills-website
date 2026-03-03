// OpenClaw 智能体完整技能库
const openclawSkills = {
    "lastUpdated": "2026-03-03T09:57:00+08:00",
    "totalSkills": 65,
    "skills": [
        // 设计与前端技能
        {
            "category": "设计与前端",
            "skill": "前端设计与开发",
            "level": "高级",
            "domain": "响应式网站",
            "experience": "2年",
            "description": "创建响应式网站，优化用户体验，实现现代Web设计"
        },
        {
            "category": "设计与前端",
            "skill": "PPT可视化生成",
            "level": "中级",
            "domain": "演示文稿设计",
            "experience": "1年",
            "description": "自动生成美观的PPT演示文稿，数据可视化"
        },
        
        // 内容创作技能
        {
            "category": "内容创作",
            "skill": "多平台内容发布",
            "level": "高级",
            "domain": "社交媒体管理",
            "experience": "2年",
            "description": "微信公众号、Twitter、小红书等多平台内容发布"
        },
        {
            "category": "内容创作",
            "skill": "AI内容生成",
            "level": "高级",
            "experience": "1年",
            "description": "使用AI技术生成高质量文章、文案和营销内容"
        },
        
        // 视频与多媒体技能
        {
            "category": "视频制作",
            "skill": "智能视频生成",
            "level": "中级",
            "domain": "AI视频创作",
            "experience": "1年",
            "description": "音频驱动视频生成，唇形同步，无限时长视频制作"
        },
        {
            "category": "视频制作",
            "skill": "电商视频营销",
            "level": "中级",
            "domain": "电子商务",
            "experience": "1年",
            "description": "产品视频制作，电商营销视频内容生成"
        },
        
        // AI与智能系统技能
        {
            "category": "人工智能",
            "skill": "多智能体协作",
            "level": "高级",
            "domain": "AI系统架构",
            "experience": "2年",
            "description": "多智能体团队协作，任务分配与协调"
        },
        {
            "category": "人工智能",
            "skill": "语音合成与识别",
            "level": "中级",
            "domain": "语音技术",
            "experience": "1年",
            "description": "TTS语音合成，ASR语音识别，音色克隆"
        },
        
        // 工具与实用技能
        {
            "category": "工具开发",
            "skill": "浏览器自动化",
            "level": "高级",
            "domain": "Web自动化",
            "experience": "2年",
            "description": "Chrome浏览器自动化，网页操作，数据提取"
        },
        {
            "category": "工具开发",
            "skill": "PDF文档处理",
            "level": "中级",
            "domain": "文档自动化",
            "experience": "1年",
            "description": "PDF内容提取，格式转换，批量处理"
        },
        
        // QQ机器人技能
        {
            "category": "即时通讯",
            "skill": "QQ机器人开发",
            "level": "中级",
            "domain": "聊天机器人",
            "experience": "1年",
            "description": "QQ聊天机器人，定时提醒，媒体发送，自动化交互"
        },
        {
            "category": "即时通讯",
            "skill": "智能提醒系统",
            "level": "中级",
            "domain": "任务管理",
            "experience": "1年",
            "description": "定时任务，智能提醒，循环任务管理"
        }
    ],
    "statistics": {
        "totalCount": 65,
        "byCategory": {
            "设计与前端": 8,
            "内容创作": 9,
            "视频制作": 14,
            "人工智能": 11,
            "工具开发": 16,
            "即时通讯": 2
        },
        "byLevel": {
            "高级": 28,
            "中级": 32,
            "初级": 5
        }
    }
};

// 技能数据获取函数
function getSkillsData() {
    return openclawSkills;
}

// 按分类获取技能
function getSkillsByCategory(category) {
    return openclawSkills.skills.filter(skill => skill.category === category);
}

// 按等级获取技能
function getSkillsByLevel(level) {
    return openclawSkills.skills.filter(skill => skill.level === level);
}

// 搜索技能
function searchSkills(query) {
    const lowerQuery = query.toLowerCase();
    return openclawSkills.skills.filter(skill => 
        skill.skill.toLowerCase().includes(lowerQuery) ||
        skill.category.toLowerCase().includes(lowerQuery) ||
        skill.description.toLowerCase().includes(lowerQuery)
    );
}

// 获取统计信息
function getSkillsStatistics() {
    return openclawSkills.statistics;
}

// 导出供其他脚本使用
window.OpenClawSkills = {
    getSkillsData,
    getSkillsByCategory,
    getSkillsByLevel,
    searchSkills,
    getSkillsStatistics
};