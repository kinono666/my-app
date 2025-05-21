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
const DataTransformFilter: React.FC = () => {

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
        boundaryGap: [0, '30%'],


      },
      visualMap: {

        type: 'piecewise',

        show: false,
        dimension: 0,

        seriesIndex: 0,
        pieces: [

          {
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
            label: { show: false },
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


export default DataTransformFilter
