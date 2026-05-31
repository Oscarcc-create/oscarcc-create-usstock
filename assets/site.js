/* ===== DATA ===== */

// S&P 500 annual returns (price index), 2000–2025
const sp500Data = [
  { year: 2000, ret: -10.14 },
  { year: 2001, ret: -13.04 },
  { year: 2002, ret: -23.37 },
  { year: 2003, ret: 26.38 },
  { year: 2004, ret: 8.99 },
  { year: 2005, ret: 3.00 },
  { year: 2006, ret: 13.62 },
  { year: 2007, ret: 3.53 },
  { year: 2008, ret: -38.49 },
  { year: 2009, ret: 23.45 },
  { year: 2010, ret: 12.78 },
  { year: 2011, ret: 0.00 },
  { year: 2012, ret: 13.41 },
  { year: 2013, ret: 29.60 },
  { year: 2014, ret: 11.39 },
  { year: 2015, ret: -0.73 },
  { year: 2016, ret: 9.54 },
  { year: 2017, ret: 19.42 },
  { year: 2018, ret: -6.24 },
  { year: 2019, ret: 28.88 },
  { year: 2020, ret: 16.26 },
  { year: 2021, ret: 26.89 },
  { year: 2022, ret: -19.44 },
  { year: 2023, ret: 24.23 },
  { year: 2024, ret: 23.31 },
  { year: 2025, ret: 16.39 },
];

// Nasdaq Composite annual returns (price index), 2000–2025
const nasdaqData = [
  { year: 2000, ret: -39.29 },
  { year: 2001, ret: -21.05 },
  { year: 2002, ret: -31.53 },
  { year: 2003, ret: 50.01 },
  { year: 2004, ret: 8.59 },
  { year: 2005, ret: 1.37 },
  { year: 2006, ret: 9.52 },
  { year: 2007, ret: 9.81 },
  { year: 2008, ret: -40.54 },
  { year: 2009, ret: 43.89 },
  { year: 2010, ret: 16.91 },
  { year: 2011, ret: -1.80 },
  { year: 2012, ret: 15.91 },
  { year: 2013, ret: 38.32 },
  { year: 2014, ret: 13.40 },
  { year: 2015, ret: 5.73 },
  { year: 2016, ret: 7.50 },
  { year: 2017, ret: 28.24 },
  { year: 2018, ret: -3.88 },
  { year: 2019, ret: 35.23 },
  { year: 2020, ret: 43.64 },
  { year: 2021, ret: 21.39 },
  { year: 2022, ret: -33.10 },
  { year: 2023, ret: 43.42 },
  { year: 2024, ret: 28.64 },
  { year: 2025, ret: 20.36 },
];

// 沪深300 annual returns (price index), 2005–2025
const hs300PriceData = [
  { year: 2005, ret: 22.7 },
  { year: 2006, ret: 120.6 },
  { year: 2007, ret: 161.5 },
  { year: 2008, ret: -65.9 },
  { year: 2009, ret: 96.7 },
  { year: 2010, ret: -12.5 },
  { year: 2011, ret: -25.0 },
  { year: 2012, ret: 7.6 },
  { year: 2013, ret: -7.7 },
  { year: 2014, ret: 51.7 },
  { year: 2015, ret: -40.3 },
  { year: 2016, ret: -11.3 },
  { year: 2017, ret: 21.8 },
  { year: 2018, ret: -25.3 },
  { year: 2019, ret: 36.1 },
  { year: 2020, ret: 27.2 },
  { year: 2021, ret: -5.2 },
  { year: 2022, ret: -21.6 },
  { year: 2023, ret: -11.4 },
  { year: 2024, ret: 14.7 },
  { year: 2025, ret: 20.9 },
];

/* ===== HELPERS ===== */

function prepareChartData(data) {
  return {
    labels: data.map(d => d.year),
    returns: data.map(d => d.ret),
    colors: data.map(d => d.ret >= 0 ? '#1a6b3c' : '#c0392b'),
    bgColors: data.map(d => d.ret >= 0 ? 'rgba(26,107,60,0.72)' : 'rgba(192,57,43,0.72)'),
    borderColors: data.map(d => d.ret >= 0 ? '#1a6b3c' : '#c0392b'),
  };
}

// Shared font
const FONT_FAMILY = '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif';

// Zero-line plugin
const zeroLinePlugin = {
  id: 'zeroLine',
  beforeDraw(chart) {
    const { ctx, scales: { x, y } } = chart;
    const yZero = y.getPixelForValue(0);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x.left, yZero);
    ctx.lineTo(x.right, yZero);
    ctx.strokeStyle = 'rgba(18,18,18,0.18)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 4]);
    ctx.stroke();
    ctx.restore();
  }
};

/* ===== S&P 500 CHART ===== */

(function() {
  const d = prepareChartData(sp500Data);
  const ctx = document.getElementById('sp500Chart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: '标普500 年度涨跌幅 (%)',
        data: d.returns,
        backgroundColor: d.bgColors,
        borderColor: d.borderColors,
        borderWidth: 1,
        borderRadius: 3,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.2,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#121212',
          titleFont: { family: FONT_FAMILY, weight: '500' },
          bodyFont: { family: FONT_FAMILY, weight: '300' },
          callbacks: {
            label(ctx) {
              const v = ctx.raw;
              const sign = v >= 0 ? '+' : '';
              return `${sign}${v.toFixed(1)}%`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: FONT_FAMILY, size: 11, weight: '300' },
            color: '#5f564d',
            maxRotation: 0,
          }
        },
        y: {
          grid: { color: 'rgba(24,20,16,0.08)' },
          ticks: {
            font: { family: FONT_FAMILY, size: 11, weight: '300' },
            color: '#5f564d',
            callback(v) { return v + '%'; }
          }
        }
      }
    },
    plugins: [zeroLinePlugin]
  });
})();

/* ===== NASDAQ CHART ===== */

(function() {
  const d = prepareChartData(nasdaqData);
  const ctx = document.getElementById('nasdaqChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: '纳斯达克 年度涨跌幅 (%)',
        data: d.returns,
        backgroundColor: d.bgColors,
        borderColor: d.borderColors,
        borderWidth: 1,
        borderRadius: 3,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.2,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#121212',
          titleFont: { family: FONT_FAMILY, weight: '500' },
          bodyFont: { family: FONT_FAMILY, weight: '300' },
          callbacks: {
            label(ctx) {
              const v = ctx.raw;
              const sign = v >= 0 ? '+' : '';
              return `${sign}${v.toFixed(1)}%`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: FONT_FAMILY, size: 11, weight: '300' },
            color: '#5f564d',
            maxRotation: 0,
          }
        },
        y: {
          grid: { color: 'rgba(24,20,16,0.08)' },
          ticks: {
            font: { family: FONT_FAMILY, size: 11, weight: '300' },
            color: '#5f564d',
            callback(v) { return v + '%'; }
          }
        }
      }
    },
    plugins: [zeroLinePlugin]
  });
})();

/* ===== 沪深300 CHART ===== */

(function() {
  const d = prepareChartData(hs300PriceData);
  const ctx = document.getElementById('hs300Chart');
  if (!ctx) return;

  // For the tall bars (2007: +161.5%), add data labels on top
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: '沪深300 年度涨跌幅 (%)',
        data: d.returns,
        backgroundColor: d.bgColors,
        borderColor: d.borderColors,
        borderWidth: 1,
        borderRadius: 3,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.2,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#121212',
          titleFont: { family: FONT_FAMILY, weight: '500' },
          bodyFont: { family: FONT_FAMILY, weight: '300' },
          callbacks: {
            label(ctx) {
              const v = ctx.raw;
              const sign = v >= 0 ? '+' : '';
              return `${sign}${v.toFixed(1)}%`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: FONT_FAMILY, size: 11, weight: '300' },
            color: '#5f564d',
            maxRotation: 0,
          }
        },
        y: {
          grid: { color: 'rgba(24,20,16,0.08)' },
          ticks: {
            font: { family: FONT_FAMILY, size: 11, weight: '300' },
            color: '#5f564d',
            callback(v) { return v + '%'; }
          }
        }
      }
    },
    plugins: [zeroLinePlugin]
  });
})();

/* ===== COMPARISON CHART (2005–2025, grouped bars) ===== */

(function() {
  const ctx = document.getElementById('compareChart');
  if (!ctx) return;

  // Filter all datasets to 2005–2025 common range
  const spx = sp500Data.filter(d => d.year >= 2005 && d.year <= 2025);
  const ndx = nasdaqData.filter(d => d.year >= 2005 && d.year <= 2025);
  const hs3 = hs300PriceData.filter(d => d.year >= 2005 && d.year <= 2025);

  const labels = spx.map(d => d.year);

  // Truncate extreme values for display, note in tooltip
  const spxReturns = spx.map(d => d.ret);
  const ndxReturns = ndx.map(d => d.ret);
  const hs3Returns = hs3.map(d => d.ret);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: '标普500',
          data: spxReturns,
          backgroundColor: 'rgba(26,75,140,0.72)',
          borderColor: '#1a4b8c',
          borderWidth: 1,
          borderRadius: 2,
          borderSkipped: false,
        },
        {
          label: '纳斯达克',
          data: ndxReturns,
          backgroundColor: 'rgba(13,115,119,0.72)',
          borderColor: '#0d7377',
          borderWidth: 1,
          borderRadius: 2,
          borderSkipped: false,
        },
        {
          label: '沪深300',
          data: hs3Returns,
          backgroundColor: 'rgba(196,58,49,0.72)',
          borderColor: '#c43a31',
          borderWidth: 1,
          borderRadius: 2,
          borderSkipped: false,
        },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { family: FONT_FAMILY, size: 13, weight: '400' },
            color: '#5f564d',
            usePointStyle: true,
            pointStyleWidth: 10,
            padding: 20,
          }
        },
        tooltip: {
          backgroundColor: '#121212',
          titleFont: { family: FONT_FAMILY, weight: '500' },
          bodyFont: { family: FONT_FAMILY, weight: '300' },
          callbacks: {
            label(ctx) {
              const v = ctx.raw;
              const sign = v >= 0 ? '+' : '';
              const note = (v > 100 || v < -60) ? ' ⚠ 极端年份' : '';
              return `${ctx.dataset.label}: ${sign}${v.toFixed(1)}%${note}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: FONT_FAMILY, size: 10, weight: '300' },
            color: '#5f564d',
            maxRotation: 0,
          }
        },
        y: {
          grid: { color: 'rgba(24,20,16,0.08)' },
          ticks: {
            font: { family: FONT_FAMILY, size: 11, weight: '300' },
            color: '#5f564d',
            callback(v) { return v + '%'; }
          }
        }
      }
    },
    plugins: [zeroLinePlugin]
  });
})();
