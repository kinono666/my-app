import { GridComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { UniversalTransition } from 'echarts/features'
import type { GridComponentOption, LineSeriesOption, SeriesOption } from 'echarts'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
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

echarts.use([GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent]);

type EChartsOption = echarts.ComposeOption<GridComponentOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | ToolboxComponentOption>;
//: React.FC类型注解，表示BumpChart是一个React函数组件（FunctionComponent 的缩写）。
  const BumpChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  // 常量数据
  const names = [
    'Orange',
    'Tomato',
    'Apple',
    'Sakana',
    'Banana',
    'Iwashi',
    'Snappy Fish',
    'Lemon',
    'Pasta'
  ] as const;

  const years = ['2001', '2002', '2003', '2004', '2005', '2006'];

  // 生成默认排名
  //Map<string, number[]>表示这个Map的键是字符串（string），值是一个数字数组（number[]）
  const generateRankingData = (): Map<string, number[]> => {
    //创建了一个空的 Map 对象，用于存储每个项目在不同年份的排名数据。
    const map: Map<string, number[]> = new Map();
    //Array.from 是一个数组构造函数，它会根据提供的参数生成一个数组。
    const defaultRanking: number[] = Array.from(
      { length: names.length },
      //_ 是一个占位符（表示当前元素，这里未使用），i 是当前元素的索引。
      (_, i) => i + 1
    );

    //打乱排名数组
    //加一个逗号 <T,>，告诉 TypeScript 这是泛型而不是 JSX。s
    const shuffle = <T,>(array: T[]): T[] => {
      let currentIndex = array.length;
      let randomIndex = 0;
      while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex]
        ];
      }
      return array;
    };

    //这段代码遍历 years 数组，为每个年份生成随机排名数据。
    for (const _ of years) {
      const shuffleArray = shuffle([...defaultRanking]);
      names.forEach((name, i) => {
        map.set(name, (map.get(name) || []).concat(shuffleArray[i]));
      });
    }
    return map;
  };

  // generateRankingData函数的作用是为每个项目（names 中的名称）在不同年份（years）生成随机排名数据.
  const generateSeriesList = (): SeriesOption[] => {
    const seriesList: SeriesOption[] = [];
    const rankingMap = generateRankingData();

    rankingMap.forEach((data, name) => {
      const series: SeriesOption = {
        name,
        symbolSize: 20,
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        //endLabel用于在数据系列的末端（最后一个数据点）显示一个标签，通常用于标注该系列的名称或数值。
          endLabel: {
            show: true,//是否显示末端标签
            formatter: '{a}',//标签内容格式,'{a}'（系列名称）/'{b}'（数据项名称）/'{c}'（数值）
            distance: 20 ,//标签与数据点的距离（像素）
          },
        lineStyle: {
          width: 4
        },
        data
      };
      seriesList.push(series);
    });
    return seriesList;
  };

  // 初始化图表
  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    const option: EChartsOption = {
      title: {
        text: 'Bump Chart (Ranking)'
      },
      tooltip: {
        trigger: 'item'
      },
      grid: {
        left: 30,
        right: 110,
        bottom: 30,
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        splitLine: {
          show: true
        },
        axisLabel: {
          margin: 30,
          fontSize: 16
        },
        boundaryGap: false,
        data: years
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          margin: 30,
          fontSize: 16,
          formatter: '#{value}'
        },
        inverse: true,
        interval: 1,
        min: 1,
        max: names.length
      },
      series: generateSeriesList(),
    };

    myChart.setOption(option);

    // 响应式调整
    const handleResize = () => myChart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '600px' }}
    />
  );
};
export default BumpChart