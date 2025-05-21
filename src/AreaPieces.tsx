import * as echarts from 'echarts/core';
import {
  GridComponent,
  VisualMapComponent,
  MarkLineComponent,
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

import type {
  VisualMapComponentOption,
  MarkLineComponentOption,
} from 'echarts/components';
import type { GridComponentOption, LineSeriesOption } from 'echarts' 
import { useEffect, useRef } from 'react';
echarts.use([
  GridComponent,
  VisualMapComponent,
  MarkLineComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

type EChartsOption = echarts.ComposeOption<
  | GridComponentOption
  | VisualMapComponentOption
  | MarkLineComponentOption
  | LineSeriesOption
>;
const AreaPieces: React.FC = () => {

  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const mychart = echarts.init(chartRef.current);
    const option: EChartsOption = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        
        
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '30%'],//作用是显示在顶部
       
        
      },
      visualMap: {
        /* 表示使用分段型视觉映射，将数据划分为多个区间（通过 pieces 定义）。
        每个区间可独立配置样式（如颜色），与连续型（continuous）不同，分段型允许非连续或不重叠的区间 */
        type: 'piecewise',

        show: false,
        dimension: 0,//表示用 x 值（即第一个维度）判断数据点应落在哪个分段区间
        // dimension: 1,
        /* 表示此视觉映射仅作用于图表中的第一个系列（即索引为 0 的系列）。若图表有多个系列（如折线图和
        柱状图并存），此配置确保颜色映射仅对第一个系列生效，其他系列不受影响。 */
        seriesIndex: 0,
        pieces: [
          //控制区域高亮的区域
          {//x轴的坐标区间
            gt: 1,
            lt: 3,
            color: 'rgba(0,0,180,0.4)'
          },
          {
            gt: 5,
            lt: 7,
            color: 'rgba(0,0,180,0.4)'

          },
        ]
      },
      series: [
        {
          type: 'line',
          smooth: 0.6,
          symbol: 'none',
          lineStyle: {
            color: '#5470C6',
            width: 5
          },
          markLine: {
            symbol: ['none', 'none'],
            label: {show: false},
            data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
          },
          areaStyle: {},
          data: [
            ['2019-10-10', 200],
            ['2019-10-11', 560],
            ['2019-10-12', 750],
            ['2019-10-13', 580],
            ['2019-10-14', 250],
            ['2019-10-15', 300],
            ['2019-10-16', 450],
            ['2019-10-17', 300],
            ['2019-10-18', 100]
          ]
        }
      ]
    }
    mychart.setOption(option);


    const handleResize = () => {
      mychart.resize();
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (!mychart.isDisposed()) {
        mychart.dispose();
      }
    }
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: '800px', height: '500px' }}>
    </div>
  )
}


export default AreaPieces
