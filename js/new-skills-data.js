// 完整的技能数据 - 包含所有59个技能
const completeSkillsData = {
    "lastUpdated": "2026-03-03T13:00:00+08:00",
    "totalSkills": 59,
    "skills": [
        // 设计与前端技能 (8项)
        {
            "id": "frontend-design",
            "name": "前端设计与开发",
            "category": "设计与前端",
            "level": "高级",
            "experience": "2年",
            "description": "专业的网页前端开发，擅长响应式设计和用户体验优化",
            "icon": "fas fa-code",
            "tags": ["HTML5", "CSS3", "JavaScript", "响应式"]
        },
        {
            "id": "web-design-analyzer",
            "name": "网页设计分析",
            "category": "设计与前端",
            "level": "中级",
            "experience": "1年",
            "description": "分析和评估网站设计，提供优化建议",
            "icon": "fas fa-palette",
            "tags": ["UI设计", "用户体验", "分析"]
        },
        {
            "id": "web-to-app",
            "name": "Web转应用",
            "category": "设计与前端",
            "level": "中级",
            "experience": "1年",
            "description": "将网页应用转换为原生移动应用",
            "icon": "fas fa-mobile-alt",
            "tags": ["PWA", "移动应用", "转换"]
        },
        {
            "id": "ai-drawio",
            "name": "AI辅助绘图",
            "category": "设计与前端",
            "level": "中级",
            "experience": "1年",
            "description": "使用人工智能辅助创建图表和可视化",
            "icon": "fas fa-project-diagram",
            "tags": ["AI绘图", "图表", "可视化"]
        },
        {
            "id": "ppt-generator",
            "name": "PPT智能生成",
            "category": "设计与前端",
            "level": "高级",
            "experience": "2年",
            "description": "自动生成专业的演示文稿",
            "icon": "fas fa-presentation",
            "tags": ["PPT", "自动化", "演示"]
        },
        {
            "id": "pptx-generator",
            "name": "PPTX高级生成",
            "category": "设计与前端",
            "level": "高级",
            "experience": "2年",
            "description": "创建复杂的PPTX演示文稿",
            "icon": "fas fa-file-powerpoint",
            "tags": ["PPTX", "高级", "演示"]
        },
        {
            "id": "ppt-roadshow-generator",
            "name": "路演PPT生成",
            "category": "设计与前端",
            "level": "中级",
            "experience": "1年",
            "description": "专门为路演活动创建演示文稿",
            "icon": "fas fa-chart-line",
            "tags": ["路演", "商业", "演示"]
        },
        {
            "id": "nanobanana-ppt-visualizer",
            "name": "PPT可视化工具",
            "category": "设计与前端",
            "level": "中级",
            "experience": "1年",
            "description": "高级PPT可视化工具",
            "icon": "fas fa-eye",
            "tags": ["可视化", "工具", "PPT"]
        },

        // 内容创作技能 (6项)
        {
            "id": "content-creation-publisher",
            "name": "多平台内容发布",
            "category": "内容创作",
            "level": "高级",
            "experience": "2年",
            "description": "在多个平台自动化发布内容",
            "icon": "fas fa-share-alt",
            "tags": ["多平台", "自动化", "发布"]
        },
        {
            "id": "content-research-writer",
            "name": "内容研究与写作",
            "category": "内容创作",
            "level": "高级",
            "experience": "2年",
            "description": "深度内容研究和专业写作",
            "icon": "fas fa-pen-fancy",
            "tags": ["研究", "写作", "内容"]
        },
        {
            "id": "ecommerce-copywriter",
            "name": "电商文案创作",
            "category": "内容创作",
            "level": "中级",
            "experience": "1年",
            "description": "专门为电商平台创作营销文案",
            "icon": "fas fa-shopping-cart",
            "tags": ["电商", "文案", "营销"]
        },
        {
            "id": "product-marketing-copywriter",
            "name": "产品营销文案",
            "category": "内容创作",
            "level": "中级",
            "experience": "1年",
            "description": "为产品创建营销文案和推广内容",
            "icon": "fas fa-bullhorn",
            "tags": ["营销", "产品", "文案"]
        },
        {
            "id": "viral-video-copywriting",
            "name": "病毒视频文案",
            "category": "内容创作",
            "level": "中级",
            "experience": "1年",
            "description": "创作具有病毒传播潜力的视频文案",
            "icon": "fas fa-virus",
            "tags": ["病毒", "视频", "文案"]
        },
        {
            "id": "qiaomu-x-article-publisher",
            "name": "X平台文章发布",
            "category": "内容创作",
            "level": "高级",
            "experience": "2年",
            "description": "在X平台发布专业文章",
            "icon": "fab fa-twitter",
            "tags": ["X平台", "文章", "发布"]
        },

        // 视频制作技能 (14项)
        {
            "id": "infinitetalk",
            "name": "无限对话视频",
            "category": "视频制作",
            "level": "高级",
            "experience": "2年",
            "description": "生成无限长度的对话视频",
            "icon": "fas fa-infinity",
            "tags": ["对话", "视频", "AI"]
        },
        {
            "id": "infinitetalk-shopping-avatar",
            "name": "购物虚拟人视频",
            "category": "视频制作",
            "level": "中级",
            "experience": "1年",
            "description": "创建购物场景的虚拟人视频",
            "icon": "fas fa-shopping-bag",
            "tags": ["虚拟人", "购物", "视频"]
        },
        {
            "id": "video-creation-suite",
            "name": "视频创作套件",
            "category": "视频制作",
            "level": "高级",
            "experience": "2年",
            "description": "完整的视频创作工具套件",
            "icon": "fas fa-film",
            "tags": ["套件", "视频", "创作"]
        },
        {
            "id": "video-creation-pro",
            "name": "专业视频创作",
            "category": "视频制作",
            "level": "高级",
            "experience": "2年",
            "description": "专业级的视频内容创作",
            "icon": "fas fa-video",
            "tags": ["专业", "视频", "创作"]
        },
        {
            "id": "video-creation-collaborator",
            "name": "视频协作创作",
            "category": "视频制作",
            "level": "中级",
            "experience": "1年",
            "description": "支持多人协作的视频创作",
            "icon": "fas fa-users",
            "tags": ["协作", "视频", "团队"]
        },
        {
            "id": "video-frame-extractor",
            "name": "视频帧提取",
            "category": "视频制作",
            "level": "中级",
            "experience": "1年",
            "description": "从视频中提取关键帧",
            "icon": "fas fa-image",
            "tags": ["帧提取", "视频", "分析"]
        },
        {
            "id": "video-recreation",
            "name": "视频重建",
            "category": "视频制作",
            "level": "中级",
            "experience": "1年",
            "description": "重新创建和优化视频内容",
            "icon": "fas fa-sync",
            "tags": ["重建", "优化", "视频"]
        },
        {
            "id": "video-transcript-downloader",
            "name": "视频字幕下载",
            "category": "视频制作",
            "level": "中级",
            "experience": "1年",
            "description": "下载视频的字幕和转录文本",
            "icon": "fas fa-closed-captioning",
            "tags": ["字幕", "下载", "转录"]
        },
        {
            "id": "digital-avatar-shopping-video",
            "name": "数字人购物视频",
            "category": "视频制作",
            "level": "中级",
            "experience": "1年",
            "description": "创建数字人形象的购物视频",
            "icon": "fas fa-user-circle",
            "tags": ["数字人", "购物", "视频"]
        },
        {
            "id": "product-video-creator",
            "name": "产品视频创作",
            "category": "视频制作",
            "level": "中级",
            "experience": "1年",
            "description": "为产品创建宣传视频",
            "icon": "fas fa-box",
            "tags": ["产品", "宣传", "视频"]
        },
        {
            "id": "ecommerce-video-marketing",
            "name": "电商视频营销",
            "category": "视频制作",
            "level": "中级",
            "experience": "1年",
            "description": "电商平台的视频营销内容",
            "icon": "fas fa-store",
            "tags": ["电商", "营销", "视频"]
        },
        {
            "id": "historical-science-video-prod",
            "name": "历史科学视频",
            "category": "视频制作",
            "level": "中级",
            "experience": "1年",
            "description": "创作历史和科学主题视频",
            "icon": "fas fa-microscope",
            "tags": ["历史", "科学", "视频"]
        },
        {
            "id": "dream-video-prompt-generator",
            "name": "梦境视频提示",
            "category": "视频制作",
            "level": "中级",
            "experience": "1年",
            "description": "生成梦境风格的视频提示",
            "icon": "fas fa-moon",
            "tags": ["梦境", "提示", "视频"]
        },
        {
            "id": "remotion-video-enhancer",
            "name": "视频增强",
            "category": "视频制作",
            "level": "中级",
            "experience": "1年",
            "description": "使用Remotion增强视频效果",
            "icon": "fas fa-magic",
            "tags": ["增强", "效果", "视频"]
        },

        // 人工智能技能 (3项)
        {
            "id": "intelligent-content-system",
            "name": "智能内容系统",
            "category": "人工智能",
            "level": "高级",
            "experience": "2年",
            "description": "智能化的内容创作和管理系统",
            "icon": "fas fa-brain",
            "tags": ["智能", "内容", "系统"]
        },
        {
            "id": "agent-team",
            "name": "智能体团队",
            "category": "人工智能",
            "level": "高级",
            "experience": "2年",
            "description": "多智能体协作团队",
            "icon": "fas fa-robot",
            "tags": ["多智能体", "协作", "团队"]
        },
        {
            "id": "multi-agent-meeting",
            "name": "多智能体会议",
            "category": "人工智能",
            "level": "高级",
            "experience": "2年",
            "description": "组织多智能体协作会议",
            "icon": "fas fa-comments",
            "tags": ["会议", "协作", "智能体"]
        },

        // 工具开发技能 (28项)
        {
            "id": "chrome-automation",
            "name": "浏览器自动化",
            "category": "工具开发",
            "level": "高级",
            "experience": "2年",
            "description": "Chrome浏览器自动化操作",
            "icon": "fab fa-chrome",
            "tags": ["浏览器", "自动化", "Chrome"]
        },
        {
            "id": "brave-search",
            "name": "Brave搜索",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "使用Brave搜索引擎",
            "icon": "fas fa-search",
            "tags": ["搜索", "Brave", "引擎"]
        },
        {
            "id": "media-processor",
            "name": "媒体处理器",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "多媒体文件处理工具",
            "icon": "fas fa-photo-video",
            "tags": ["媒体", "处理", "工具"]
        },
        {
            "id": "pdf-processing-pro",
            "name": "PDF专业处理",
            "category": "工具开发",
            "level": "高级",
            "experience": "2年",
            "description": "专业的PDF文档处理",
            "icon": "fas fa-file-pdf",
            "tags": ["PDF", "处理", "文档"]
        },
        {
            "id": "tailored-resume-generator",
            "name": "定制简历生成",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "生成定制化的简历",
            "icon": "fas fa-file-alt",
            "tags": ["简历", "生成", "定制"]
        },
        {
            "id": "product-manager-toolkit",
            "name": "产品经理工具",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "产品经理专用工具包",
            "icon": "fas fa-tools",
            "tags": ["产品", "经理", "工具"]
        },
        {
            "id": "pet-commerce-creator",
            "name": "宠物电商创作",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "宠物用品电商内容创作",
            "icon": "fas fa-paw",
            "tags": ["宠物", "电商", "创作"]
        },
        {
            "id": "poetry-music-visual",
            "name": "诗歌音乐可视化",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "诗歌和音乐的可视化呈现",
            "icon": "fas fa-music",
            "tags": ["诗歌", "音乐", "可视化"]
        },
        {
            "id": "pop-up-book-illustration",
            "name": "立体书插画",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "创作立体书风格的插画",
            "icon": "fas fa-book-open",
            "tags": ["立体书", "插画", "创作"]
        },
        {
            "id": "historical-interview-scripts",
            "name": "历史访谈脚本",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "创作历史主题的访谈脚本",
            "icon": "fas fa-history",
            "tags": ["历史", "访谈", "脚本"]
        },
        {
            "id": "bedtime-story",
            "name": "睡前故事",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "创作睡前故事内容",
            "icon": "fas fa-bed",
            "tags": ["故事", "睡前", "创作"]
        },
        {
            "id": "NanoBanana-PPT-Skills",
            "name": "NanoBanana PPT",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "NanoBanana PPT技能",
            "icon": "fas fa-banana",
            "tags": ["NanoBanana", "PPT", "技能"]
        },
        {
            "id": "jiamu-skills",
            "name": "Jiamu技能",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "Jiamu专用技能集",
            "icon": "fas fa-star",
            "tags": ["Jiamu", "技能", "专用"]
        },
        {
            "id": "agentkit-multimedia-shopping",
            "name": "多媒体购物",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "多媒体购物工具包",
            "icon": "fas fa-shopping-basket",
            "tags": ["多媒体", "购物", "工具"]
        },
        {
            "id": "obsidian-skills-integrated",
            "name": "Obsidian集成",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "Obsidian知识管理集成",
            "icon": "fas fa-book",
            "tags": ["Obsidian", "集成", "知识"]
        },
        {
            "id": "paper-analysis-assistant",
            "name": "论文分析助手",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "学术论文分析工具",
            "icon": "fas fa-graduation-cap",
            "tags": ["论文", "分析", "学术"]
        },
        {
            "id": "stock-analysis",
            "name": "股票分析",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "股票市场分析工具",
            "icon": "fas fa-chart-line",
            "tags": ["股票", "分析", "金融"]
        },
        {
            "id": "data-storytelling",
            "name": "数据故事讲述",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "用故事形式呈现数据",
            "icon": "fas fa-chart-bar",
            "tags": ["数据", "故事", "可视化"]
        },
        {
            "id": "anything-to-notebooklm",
            "name": "NotebookLM转换",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "内容转换到NotebookLM",
            "icon": "fas fa-exchange-alt",
            "tags": ["NotebookLM", "转换", "内容"]
        },
        {
            "id": "qwen3-asr-assistant",
            "name": "语音识别助手",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "Qwen3语音识别辅助",
            "icon": "fas fa-microphone",
            "tags": ["语音", "识别", "Qwen3"]
        },
        {
            "id": "qwen3-tts-local",
            "name": "本地语音合成",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "本地化文本转语音",
            "icon": "fas fa-volume-up",
            "tags": ["语音", "合成", "本地"]
        },
        {
            "id": "tts-voice-synthesis",
            "name": "语音合成",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "文本到语音合成技术",
            "icon": "fas fa-comment-dots",
            "tags": ["语音", "合成", "TTS"]
        },
        {
            "id": "video-creation-collaborator",
            "name": "视频协作",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "视频创作协作工具",
            "icon": "fas fa-handshake",
            "tags": ["视频", "协作", "创作"]
        },
        {
            "id": "video-creation-pro",
            "name": "专业视频创作",
            "category": "工具开发",
            "level": "高级",
            "experience": "2年",
            "description": "专业级视频创作工具",
            "icon": "fas fa-video",
            "tags": ["专业", "视频", "创作"]
        },
        {
            "id": "video-creation-suite",
            "name": "视频创作套件",
            "category": "工具开发",
            "level": "高级",
            "experience": "2年",
            "description": "完整的视频创作工具套件",
            "icon": "fas fa-film",
            "tags": ["套件", "视频", "创作"]
        },
        {
            "id": "video-frame-extractor",
            "name": "视频帧提取",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "提取视频中的关键帧",
            "icon": "fas fa-image",
            "tags": ["帧提取", "视频", "分析"]
        },
        {
            "id": "video-recreation",
            "name": "视频重建",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "视频内容重建工具",
            "icon": "fas fa-sync",
            "tags": ["重建", "视频", "工具"]
        },
        {
            "id": "video-transcript-downloader",
            "name": "视频字幕下载",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "下载视频字幕内容",
            "icon": "fas fa-closed-captioning",
            "tags": ["字幕", "下载", "视频"]
        },
        {
            "id": "viral-video-copywriting",
            "name": "病毒视频文案",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "创作病毒式传播视频文案",
            "icon": "fas fa-virus",
            "tags": ["病毒", "视频", "文案"]
        },
        {
            "id": "web-design-analyzer",
            "name": "网页设计分析",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "网页设计分析和评估",
            "icon": "fas fa-palette",
            "tags": ["网页", "设计", "分析"]
        },
        {
            "id": "web-to-app",
            "name": "Web转应用",
            "category": "工具开发",
            "level": "中级",
            "experience": "1年",
            "description": "将网站转换为应用",
            "icon": "fas fa-mobile-alt",
            "tags": ["转换", "应用", "Web"]
        }
    ],
    "statistics": {
        "byCategory": {
            "设计与前端": 8,
            "内容创作": 6,
            "视频制作": 14,
            "人工智能": 3,
            "工具开发": 28
        },
        "byLevel": {
            "高级": 28,
            "中级": 31,
            "初级": 0
        }
    }
};

// 全局变量
window.completeSkillsData = completeSkillsData;