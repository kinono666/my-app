import { GridComponent } from 'echarts/components'          // 导入网格组件（用于坐标系布局）
import { LineChart } from 'echarts/charts'                 // 导入折线图图表类型
import { CanvasRenderer } from 'echarts/renderers'         // 导入 Canvas 渲染器,作用是渲染图表
import { UniversalTransition } from 'echarts/features'     // 导入通用动画过渡效果
import type { GridComponentOption, LineSeriesOption } from 'echarts'  // 导入类型定义
import { useEffect, useRef } from 'react'                  // 导入 React Hooks
import * as echarts from 'echarts/core'                    // 导入 ECharts 核心库
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent
} from 'echarts/components';
import type {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  ToolboxComponentOption
} from 'echarts/components';


//作用：按需注册 ECharts 的必需模块（减少打包体积）
echarts.use([GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent]);
//作用：合并网格配置和折线图配置的类型，用于约束option对象
type EChartsOption = echarts.ComposeOption<GridComponentOption | LineSeriesOption | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | ToolboxComponentOption>;
const StackedAreaChartomponent: React.FC = () => {
  //HTMLDivElement表示HTML<div>元素的DOM接口
  const chartRef = useRef<HTMLDivElement>(null);//useRef：获取挂载图表的 DOM 容器
  //初始化图表（useEffect）
  useEffect(() => {
    if (!chartRef.current) return;// 防御性检查
    // const mychart = echarts.init(chartRef.current,'dark');// 初始化图表实例
    const mychart = echarts.init(chartRef.current);// 初始化图表实例
    const option: EChartsOption = {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      title: {
        text: '渐变堆叠面积图'
      },
      // X 轴（类目型）
      tooltip: {
        trigger: 'axis',  //触发方式（坐标轴触发）
        axisPointer: {    //坐标轴指示器配置
          type: "cross",  //cross显示十字准星指示器,同时高亮X轴和Y轴
          label: {
            backgroundColor: "#6a7985"   //自定义指示器标签（显示当前坐标值的文本框）的背景颜色
          }
        }
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        //用于控制图表绘制时是否将标签文字包含在图形之内‌。当containLabel配置为true时，
        // 标签文字将被自动包含在图形边界之内，以确保标签文字不会超出图形的范围。
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}//保存为图片
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      // Y 轴（数值型）
      // 折线图数据
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',

          smooth: true,
          //设置线条宽度为0，只显示颜色填充
          lineStyle: {
            width: 0,
          },
          //禁用数据点的图形标记（symbol）显示,折线图/散点图等会在每个数据点位置显示图形标记（如圆形）
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },

          emphasis: {
            focus: 'series'
          },

          data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)'
              }
            ])
          },

          emphasis: {
            focus: 'series'
          },

          data: [120, 282, 111, 234, 220, 340, 310]
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          },

          emphasis: {
            focus: 'series'
          },

          data: [320, 132, 201, 334, 190, 130, 220]
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 135)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },

          data: [220, 402, 231, 134, 190, 230, 120]
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 191, 0)'
              },
              {
                offset: 1,
                color: 'rgb(224, 62, 76)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 302, 181, 234, 210, 290, 150]
        }
      ]
    }
    mychart.setOption(option);// 应用配置
    // 定义 resize 函数
    //作用：监听浏览器窗口大小变化，自动调整图表尺寸（保持图表自适应）
    const handleResize = () => {
      mychart.resize();
    }
    // 监听窗口变化
    window.addEventListener('resize', () => {
      mychart.resize();
    })
    return () => {
      window.removeEventListener('resize', handleResize);// 移除事件监听
      mychart.dispose();// 销毁图表实例（防止内存泄漏）
    }
  }, []);

  return (
    <div
      ref={chartRef}
      //必须明确指定容器的宽高（否则图表无法渲染）
      style={{ width: '800px', height: '600px' }}>
    </div>
  )
}

export default StackedAreaChartomponent
