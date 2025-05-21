// 导入网格组件（用于坐标系布局）
import { GridComponent } from 'echarts/components';
// 导入折线图和柱状图图表类型
import { LineChart, BarChart } from 'echarts/charts';
// 导入 Canvas 渲染器，用于渲染图表
import { CanvasRenderer } from 'echarts/renderers';
// 导入通用动画过渡效果，来自 features 模块
import { UniversalTransition } from 'echarts/features';
// 导入类型定义，用于 TypeScript 类型检查
import type { GridComponentOption, LineSeriesOption } from 'echarts';
// 导入 React Hooks，用于操作 DOM 和生命周期管理
import { useEffect, useRef } from 'react';
// 导入 ECharts 核心库
import * as echarts from 'echarts/core';
// 导入其他组件模块
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  MarkPointComponent,
  MarkLineComponent
} from 'echarts/components';
// 导入其他组件的类型定义
import type {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  ToolboxComponentOption
} from 'echarts/components';

// 按需注册 ECharts 的必需模块，减少打包体积
echarts.use([
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  BarChart,
  MarkPointComponent,
  MarkLineComponent
]);

// 定义 ECharts 配置选项的类型
type EChartsOption = echarts.ComposeOption<
  | GridComponentOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | ToolboxComponentOption>;

// 定义 TemperatureChange 组件
const TemperatureChange: React.FC = () => {
  // 使用 useRef 创建一个引用，指向图表容器 DOM 元素
  const chartRef = useRef<HTMLDivElement>(null);

  // 使用 useEffect 钩子初始化图表
  useEffect(() => {
    // 如果容器 DOM 元素不存在，则直接返回
    if (!chartRef.current) return;

    // 初始化 ECharts 图表实例
    const mychart = echarts.init(chartRef.current);

    // 定义图表的配置选项
    const option: EChartsOption = {
      // 图表标题
      title: {
        text: '未来一周气温变化 '
      },
      // 提示框配置
      tooltip: {
        trigger: 'axis'
      },
      // 图例配置
      legend: {},
      // 工具箱配置
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {}
        }
      },
      // X 轴配置
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      // Y 轴配置
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        }
      },
      // 数据系列配置
      series: [
        {
          name: 'Highest',
          type: 'line',
          data: [10, 11, 13, 11, 12, 12, 9],
          // 标记点配置
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
          // 标记线配置
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          }
        },
        {
          name: 'Lowest',
          type: 'line',
          data: [1, -2, 2, 5, 3, 2, 0],
          // 标记点配置
          markPoint: {
            data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
          },
          // 标记线配置
          markLine: {
            data: [
              /* 这条标记线会自动计算数据系列的平均值，并在 Y 轴上绘制一条水平线，表示平均值。 */
              { type: 'average', name: 'Avg' },
              // 第二条标记线，由两个部分组成的标记线，通常用于绘制一条从某个点到另一个点的线段。
              [
                {
                  symbol: 'none',//表示这个点不显示任何图形符号。
                  //作用是在 x 轴上将标记线放置在 90% 的位置，即 90% 的位置对应的 x 轴坐标。
                  /* x: '90%' 是一个相对位置的设置，它表示在 X 轴的长度范围内，从左边开始计算 90% 的位置。
                  这种设置方式与数据的实际值无关，而是基于 X 轴的范围来计算的。例如，如果 X 轴的范围是从 
                  'Mon' 到 'Sun'（一周的每一天），90% 的位置大约是接近 'Sun' 的位置。 */
                  x: '90%',
                  yAxis: 'max'
                },
                {
                  symbol: 'circle',//这个点会显示一个圆形符号
                  label: {
                    position: 'start',//表示标签显示在标记线的起点
                    formatter: 'Max'
                  },
                  type: 'max',
                  name: '最高点'
                }
              ]
            ]
          }
        }
      ]
    };

    // 应用配置到图表实例
    mychart.setOption(option);

    // 定义 resize 函数，用于监听浏览器窗口大小变化并调整图表尺寸
    const handleResize = () => {
      mychart.resize();
    };

    // 监听窗口大小变化事件
    window.addEventListener('resize', handleResize);

    // 清理函数，防止内存泄漏
    return () => {
      // 移除窗口大小变化事件监听
      window.removeEventListener('resize', handleResize);

      // 判断图表实例是否已销毁，未销毁则销毁
      if (!mychart.isDisposed()) {
        mychart.dispose();
      }
    };
  }, []); // 空依赖数组表示只运行一次

  // 渲染图表容器
  return (
    <div
      ref={chartRef}
      // 设置容器的样式，必须明确指定宽高，否则图表无法渲染
      style={{
        width: '100%',
        height: '600px',
        maxWidth: '1200px',  // 避免在大屏幕上过宽
        margin: '0 auto'
      }}
    >
    </div>
  );
};

// 导出 TemperatureChange 组件
export default TemperatureChange;