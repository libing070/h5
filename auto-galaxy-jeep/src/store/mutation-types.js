/**
 * Created by echaoo on 17/10/31.
 */
export const SET_SAMPLES = "SET_SAMPLES"; // 所选择的本品
export const SET_CHARTPATH = "SET_CHARTPATH"; // 请求echart数据的路径
export const SET_SELECTEDTYPE = "SET_SelectedType"; // 皮安排，车型等
export const SET_PARAMS = "SET_Params"; // 请求获取echart路径所需参数(非全部)
export const SET_SETTINGS = "SET_Settings"; // 请求获取echart路径所需settings参数(非全部)
export const SET_IDPARAMS = "SET_IdParams"; // chartParams的id滑入color_id
export const SET_RELATION = "SET_Relation"; // 请求获取竞品所需关系
export const SET_DATE = "SET_Date"; // 请求获取竞品所需时间
export const SET_TERRITORY = "SET_TERRITORY"; // 请求获取竞品所需地域
export const SET_SCOPETYPE = "SET_SCOPETYPE"; // 请求获取echart路径所需settings参数(非全部)
export const SET_ISHEATMAP = "SET_IsHeatmap"; // 判断是否为热力图
export const SET_HEATMAPSCOPE = "SET_heatmapScope"; // 热力图大小范围
export const IS_PAINT_HEATMAP = "IS_PAINT_HEATMAP"; // 是否绘制热力图
export const SET_ALLSAMPLES = "SET_allSamples"; // 首页请求的所有类型的数据
export const SET_COMPITIVEDATA = "SET_compitiveData";
export const SET_CHARTCOMPITIVEDATA = "SET_chartCompitiveData"; // 点击echarts图表时需要更新的竞品列表
export const SET_IMAGEDATAARRAY = "SET_imageDataArray"; // 存放历史图表
export const SET_LOADING = "SET_loading"; // 设置loading状态
export const SET_FILTER = "SET_filter"; // 设置门槛
export const CLEAR_IMAGEDATAARRAY = "CLEAR_IMAGEDATAARRAY"; // 设置门槛
export const SET_ISFRESH = "SET_ISFRESH"; // 设置门槛
export const RESET = "RESET"; // 重置线索量重合量和字体设置
export const SET_DEFAULT_FILTER = "SET_DEFAULT_FILTER"; // 重置线索量重合量和字体设置

export const RESET_CONTRAST = "RESET_CONTRAST"; // 页面切换，清空state数据
export const CLEAR_ALL = "CLEAR_ALL"; // 清空对比分析
export const CLOSE_HALF = "CLOSE_HALF"; // 单击空白处关闭对比分析
export const EXPAND_SETTING = "EXPAND_SETTING"; // 展开收缩效果
export const SET_POP_STATUS = "SET_POP_STATUS"; // 弹出或关闭图表
export const SET_LOADING_ICON = "SET_LOADING_ICON"; // 弹出或关闭图表
export const CHANGE_RENDERFLAG = "CHANGE_RENDERFLAG"; // 一变化就渲染图表

export const CHANGE_X_AXIS = "CHANGE_X_AXIS"; // 改变X轴参数

export const COMPARE_TYPE = "COMPARE_TYPE"; // 竞品类型
export const SET_COMPARE_CAR_ARR = "SET_COMPARE_CAR_ARR"; // 竞品选择
export const SET_COMPARE_CAR_ID_ARR = "SET_COMPARE_CAR_ID_ARR"; // 设置对比车型ID

export const HANDLE_DATE_TYPE = "HANDLE_DATE_TYPE"; // 时间类型
export const HANDLE_DATE_CAL = "HANDLE_DATE_CAL"; // 时间类型2
export const HANDLE_DATE_SEL = "HANDLE_DATE_SEL"; // 时间选择

export const CHANGE_AREA1 = "CHANGE_AREA1"; // 地域选择：类型
export const CHANGE_AREA_P = "CHANGE_AREA_P"; // 地域选择：省份
export const CHANGE_AREA_C = "CHANGE_AREA_C"; // 地域选择：城市
export const SET_LEVEL_ARR = "SET_LEVEL_ARR"; // 地域选择：级别
export const SET_CARYEAR = "SET_CARYEAR"; // 装配率：车款年代
export const SET_AREA_SINGLE = "SET_AREA_SINGLE"; // APP安装偏好：月份单选
export const SET_DATE_SINGLE = "SET_DATE_SINGLE"; // APP安装偏好：月份单选
export const SET_SENCE = "SET_SENCE"; // 热力图选择场景

export const SET_HABIT_DATA = "SET_HABIT_DATA"; // 触媒习惯：设置返回数据
export const SET_HEATMAP_DATA = "SET_HEATMAP_DATA"; // 热力图：设置返回数据
export const SET_HEATMAP_OPTS = "SET_HEATMAP_OPTS"; // 热力图：设置参数

export const HANDLE_DEVICE_CHANGE = "HANDLE_DEVICE_CHANGE"; // 设备类型选择
export const HANDLE_DEVICE_NAMES_CHANGE = "HANDLE_DEVICE_NAMES_CHANGE"; // 设备类型名称选择
export const HANDLE_END_CHANGE = "HANDLE_END_CHANGE"; // 设置终端

export const SET_CAR_CHOSEN_TYPE = "SET_CAR_CHOSEN_TYPE"; // 设置数据展示方式：整体还是单个，来自画像分析
export const HANDLE_DIMENSION_YEAR_CHANGE = "HANDLE_DIMENSION_YEAR_CHANGE"; // 设置用户画像年份信息
export const HANDLE_DIMENSION_CHANGE = "HANDLE_DIMENSION_CHANGE"; // 设置数据维度
export const SET_PRICE_RANGE = "SET_PRICE_RANGE"; // 设置价格区间
export const SET_MIXED_DATA = "SET_MIXED_DATA"; // 设置复合型图表数据
export const SET_ZFZB_DATA = "SET_ZFZB_DATA"; // 设置正反占比图表数据

export const SET_DATA_TYPE = "SET_DATA_TYPE"; // Y轴选择

export const CHANGE_CHARTTYPE = "CHANGE_CHARTTYPE"; // 图表类型选择

export const SET_CHART_DATA = "SET_CHART_DATA"; // 为图表灌入数据
export const SET_KOUBEI_DATA = "SET_KOUBEI_DATA"; // 为图表灌入数据

export const CACHE_QUERY_PARAM_OBJ = "CACHE_QUERY_PARAM_OBJ"; // 缓存请求图表数据的参数对象

// Common部分
export const CHANGE_MASK_STATE = "CHANGE_MASK_STATE"; // 全局遮罩层
export const SET_CHART_CLICK_DATA = "SET_CHART_CLICK_DATA"; // 点击图表节点数据
export const CHANGE_GLOBAL_STATE = "CHANGE_GLOBAL_STATE"; // 全局登录状态
export const SET_USER_PHONE = "SET_USER_PHONE"; // 设置用户手机
// export const SET_LANG = "SET_LANG"; // 设置语言
