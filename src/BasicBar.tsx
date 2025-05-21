import * as echarts from 'echarts/core';
import {
  GridComponent,
  VisualMapComponent,
  MarkLineComponent,
  TooltipComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';

import type {
  VisualMapComponentOption,
  MarkLineComponentOption,
  TooltipComponentOption
} from 'echarts/components';
import type { GridComponentOption, LineSeriesOption, BarSeriesOption } from 'echarts'
import { useEffect, useRef } from 'react';
echarts.use([
  GridComponent,
  VisualMapComponent,
  MarkLineComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  BarChart,
  TooltipComponent
]);

type EChartsOption = echarts.ComposeOption<
  | GridComponentOption
  | VisualMapComponentOption
  | MarkLineComponentOption
  | LineSeriesOption
  | BarSeriesOption
  | TooltipComponentOption
>;
const BasicBar: React.FC = () => {

  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const mychart = echarts.init(chartRef.current);
    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [{
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{
        type: 'value',
      }],
      series: [
        {
          name: 'series1',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'bar',
          barWidth: '60%',
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


export default BasicBar
