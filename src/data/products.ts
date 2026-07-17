export interface Product {
  id: number;
  name: string;
  nameEn: string;
  origin: string;
  price: string;
  capacity: string;
  image: string;
  category: 'herbal' | 'citrus' | 'woody' | 'floral';
  categoryLabel: string;
  description: string;
  note: string;
  scentProfile?: { top?: string; middle?: string; base?: string };
  benefits?: string[];
  usage?: string[];
  blending?: string[];
  story?: string;
  safety?: string;
  extraction?: string;
}

export const products: Product[] = [
  { id: 1, name: '迷迭香', nameEn: 'Rosemary', origin: '摩洛哥', price: '268', capacity: '10ml', image: '/images/herbal-rosemary.jpg', category: 'herbal', categoryLabel: '草本', description: '增强记忆与专注力的清新草本香气', note: '提神 / 专注', scentProfile: { top: '清新樟脑', middle: '温暖草本', base: '木质尾韵' }, benefits: ['增强记忆力', '缓解肌肉酸痛', '促进头皮循环'], usage: ['扩香3-4滴', '按摩稀释后使用'], extraction: '蒸汽蒸馏', story: '古希腊学生佩戴迷迭香花环以增强记忆。' },
  { id: 2, name: '佛手柑', nameEn: 'Bergamot', origin: '意大利', price: '458', capacity: '10ml', image: '/images/citrus-bergamot.jpg', category: 'citrus', categoryLabel: '暖阳', description: '阳光般清新的柑橘果香，缓解焦虑', note: '愉悦 / 舒缓', scentProfile: { top: '明亮柑橘', middle: '柔和花香', base: '木质底蕴' }, benefits: ['缓解焦虑', '改善睡眠', '平衡油脂'], usage: ['扩香3-4滴', '手帕嗅闻'], extraction: '冷压法', story: '伯爵茶的灵魂香气，产自意大利卡拉布里亚。' },
  { id: 3, name: '檀香', nameEn: 'Sandalwood', origin: '印度', price: '1280', capacity: '5ml', image: '/images/woody-sandalwood.jpg', category: 'woody', categoryLabel: '木质', description: '千年古树的灵魂沉淀，冥想首选', note: '安神 / 冥想', scentProfile: { top: '温和木质', middle: '奶油甜香', base: '琥珀底蕴' }, benefits: ['深度放松', '改善皮肤干燥', '提升专注'], extraction: '水蒸气蒸馏', story: '印度教与佛教中的神圣之木。' },
  { id: 4, name: '大马士革玫瑰', nameEn: 'Damask Rose', origin: '保加利亚', price: '898', capacity: '5ml', image: '/images/floral-rose.jpg', category: 'floral', categoryLabel: '花语', description: '百花之王的奢华芬芳，滋养肌肤', note: '滋养 / 温暖', scentProfile: { top: '清甜花香', middle: '蜂蜜甜韵', base: '木质底蕴' }, benefits: ['滋养肌肤', '调节荷尔蒙', '缓解经期不适'], extraction: '水蒸气蒸馏', story: '约4000公斤花瓣才能萃取1公斤精油。' },
  { id: 5, name: '薰衣草', nameEn: 'Lavender', origin: '法国普罗旺斯', price: '368', capacity: '10ml', image: '/images/prod-lavender.jpg', category: 'floral', categoryLabel: '花语', description: '经典的安神助眠之选', note: '助眠 / 舒缓', scentProfile: { top: '清新花香', middle: '草本香', base: '木质尾韵' }, benefits: ['改善失眠', '舒缓晒伤', '缓解头痛'], extraction: '水蒸气蒸馏', story: '来自普罗旺斯海拔800米以上有机农场。' },
  { id: 6, name: '乳香', nameEn: 'Frankincense', origin: '阿曼', price: '788', capacity: '10ml', image: '/images/prod-frankincense.jpg', category: 'woody', categoryLabel: '木质', description: '神圣的木质香气，净化心灵', note: '冥想 / 净化', scentProfile: { top: '柠檬气息', middle: '树脂香', base: '木质底蕴' }, benefits: ['深度冥想', '淡化细纹', '净化空间'], extraction: '水蒸气蒸馏', story: '被称为"沙漠的黄金"，数千年神圣熏香。' },
  { id: 7, name: '薄荷', nameEn: 'Peppermint', origin: '美国', price: '228', capacity: '10ml', image: '/images/prod-peppermint.jpg', category: 'herbal', categoryLabel: '草本', description: '清凉提神，缓解头痛', note: '清凉 / 提神', scentProfile: { top: '清凉薄荷', middle: '甜美草本', base: '淡淡苦味' }, benefits: ['缓解头痛', '提神醒脑', '清凉退烧'], extraction: '水蒸气蒸馏', story: '最古老的药用植物之一。' },
  { id: 8, name: '尤加利', nameEn: 'Eucalyptus', origin: '澳大利亚', price: '298', capacity: '10ml', image: '/images/prod-eucalyptus.jpg', category: 'herbal', categoryLabel: '草本', description: '清新通透的呼吸之友', note: '呼吸 / 净化', scentProfile: { top: '樟脑清新', middle: '清凉薄荷', base: '木质香' }, benefits: ['缓解鼻塞', '净化空气', '缓解肌肉痛'], extraction: '水蒸气蒸馏', story: '澳大利亚标志性植物。' },
  { id: 9, name: '柠檬', nameEn: 'Lemon', origin: '意大利西西里', price: '198', capacity: '10ml', image: '/images/prod-lemon.jpg', category: 'citrus', categoryLabel: '暖阳', description: '阳光亲吻过的果实芬芳', note: '净化 / 提振', scentProfile: { top: '明亮柑橘', middle: '清甜果香', base: '绿意底蕴' }, benefits: ['净化空气', '美白肌肤', '缓解疲劳'], extraction: '冷压法', story: '西西里火山土壤赋予独特浓郁香气。' },
  { id: 10, name: '雪松', nameEn: 'Cedarwood', origin: '摩洛哥', price: '328', capacity: '10ml', image: '/images/prod-cedarwood.jpg', category: 'woody', categoryLabel: '木质', description: '沉稳的木质香气，安定情绪', note: '安定 / 助眠', scentProfile: { top: '温暖木质', middle: '蜂蜜甜香', base: '树脂底蕴' }, benefits: ['改善失眠', '缓解焦虑', '改善头皮屑'], extraction: '水蒸气蒸馏', story: '北非阿特拉斯山脉的古老树种。' },
  { id: 11, name: '茉莉', nameEn: 'Jasmine', origin: '埃及', price: '1680', capacity: '3ml', image: '/images/prod-jasmine.jpg', category: 'floral', categoryLabel: '花语', description: '花中皇后的馥郁香韵', note: '自信 / 魅力', scentProfile: { top: '浓郁花香', middle: '甜美果香', base: '麝香尾韵' }, benefits: ['提升自信', '滋润肌肤', '催情助性'], extraction: '溶剂萃取', story: '800万朵茉莉花萃取1公斤精油。' },
  { id: 12, name: '天竺葵', nameEn: 'Geranium', origin: '留尼汪', price: '358', capacity: '10ml', image: '/images/prod-geranium.jpg', category: 'floral', categoryLabel: '花语', description: '平衡身心的玫瑰替代品', note: '平衡 / 护肤', scentProfile: { top: '清新玫瑰', middle: '薄荷草本', base: '木质尾韵' }, benefits: ['平衡荷尔蒙', '调节油脂', '缓解经前症候群'], extraction: '水蒸气蒸馏', story: '被称为"穷人的玫瑰"。' },
  { id: 13, name: '茶树', nameEn: 'Tea Tree', origin: '澳大利亚', price: '188', capacity: '10ml', image: '/images/herbal-rosemary.jpg', category: 'herbal', categoryLabel: '草本', description: '天然的抗菌消炎卫士', note: '抗菌 / 净化', benefits: ['强效抗菌', '治疗痘痘', '缓解脚气'], extraction: '水蒸气蒸馏', safety: '不可内服，避免接触眼睛。' },
  { id: 14, name: '甜橙', nameEn: 'Sweet Orange', origin: '巴西', price: '168', capacity: '10ml', image: '/images/citrus-bergamot.jpg', category: 'citrus', categoryLabel: '暖阳', description: '温暖甜美的阳光气息', note: '快乐 / 消化', benefits: ['提振情绪', '促进消化', '改善循环'], extraction: '冷压法' },
  { id: 15, name: '沉香', nameEn: 'Agarwood', origin: '越南', price: '2880', capacity: '3ml', image: '/images/woody-sandalwood.jpg', category: 'woody', categoryLabel: '木质', description: '珍稀沉香的极致香韵', note: '入定 / 收藏', benefits: ['深度入定', '安神助眠', '收藏增值'], extraction: '水蒸气蒸馏', safety: '极其珍贵，建议少量使用。' },
  { id: 16, name: '洋甘菊', nameEn: 'Chamomile', origin: '德国', price: '458', capacity: '5ml', image: '/images/prod-lavender.jpg', category: 'floral', categoryLabel: '花语', description: '温和的安抚力量', note: '舒缓 / 婴儿', benefits: ['舒缓敏感', '缓解焦虑', '安抚婴儿'], extraction: '水蒸气蒸馏', safety: '对菊科植物过敏者禁用。' },
  { id: 17, name: '百里香', nameEn: 'Thyme', origin: '法国', price: '288', capacity: '10ml', image: '/images/prod-peppermint.jpg', category: 'herbal', categoryLabel: '草本', description: '强劲的草本力量', note: '免疫 / 抗菌', benefits: ['强效抗菌', '增强免疫', '缓解关节痛'], extraction: '水蒸气蒸馏', safety: '孕妇禁用。' },
  { id: 18, name: '葡萄柚', nameEn: 'Grapefruit', origin: '美国', price: '228', capacity: '10ml', image: '/images/prod-lemon.jpg', category: 'citrus', categoryLabel: '暖阳', description: '活力满满的清甜果香', note: '排毒 / 减重', benefits: ['促进排毒', '消除水肿', '抑制食欲'], extraction: '冷压法', safety: '光敏性精油。' },
  { id: 19, name: '广藿香', nameEn: 'Patchouli', origin: '印尼', price: '298', capacity: '10ml', image: '/images/prod-cedarwood.jpg', category: 'woody', categoryLabel: '木质', description: '神秘的东方香气', note: '安定 / 护肤', benefits: ['安定情绪', '改善干燥', '帮助愈合'], extraction: '水蒸气蒸馏' },
  { id: 20, name: '依兰依兰', nameEn: 'Ylang Ylang', origin: '马达加斯加', price: '528', capacity: '10ml', image: '/images/prod-jasmine.jpg', category: 'floral', categoryLabel: '花语', description: '热带花园的馥郁诱惑', note: '浪漫 / 护发', benefits: ['缓解焦虑', '降低血压', '护发亮泽'], extraction: '分馏蒸馏' },
  { id: 21, name: '丝柏', nameEn: 'Cypress', origin: '法国', price: '318', capacity: '10ml', image: '/images/prod-eucalyptus.jpg', category: 'herbal', categoryLabel: '草本', description: '清新的针叶芬芳', note: '收敛 / 净化', benefits: ['改善曲张', '收敛控油', '缓解潮热'], extraction: '水蒸气蒸馏' },
  { id: 22, name: '莱姆', nameEn: 'Lime', origin: '墨西哥', price: '208', capacity: '10ml', image: '/images/prod-lemon.jpg', category: 'citrus', categoryLabel: '暖阳', description: '比柠檬更清新的绿意', note: '清新 / 开胃', benefits: ['净化空气', '提亮肤色', '开胃助消化'], extraction: '冷压法' },
  { id: 23, name: '岩兰草', nameEn: 'Vetiver', origin: '海地', price: '388', capacity: '10ml', image: '/images/prod-frankincense.jpg', category: 'woody', categoryLabel: '木质', description: '大地的沉稳气息', note: 'grounding / 助眠', benefits: ['深度放松', '改善注意力', '助眠安神'], extraction: '水蒸气蒸馏' },
  { id: 24, name: '橙花', nameEn: 'Neroli', origin: '突尼斯', price: '1580', capacity: '3ml', image: '/images/prod-geranium.jpg', category: 'floral', categoryLabel: '花语', description: '珍贵的白色花香', note: '抗焦虑 / 护肤', benefits: ['抚平焦虑', '淡化疤痕', '改善弹性'], extraction: '水蒸气蒸馏' },
];

export const categories = [
  { id: 'all', label: '全部', color: '#48bb9c' },
  { id: 'herbal', label: '草本', color: '#5a9e7d' },
  { id: 'citrus', label: '暖阳', color: '#e8a93a' },
  { id: 'woody', label: '木质', color: '#8b6e4e' },
  { id: 'floral', label: '花语', color: '#d479a8' },
];
