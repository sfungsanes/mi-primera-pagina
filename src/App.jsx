import React, { useState, useMemo, useCallback } from 'react';
import { 
  ChevronDown, ChevronRight, TrendingUp, TrendingDown, AlertTriangle, 
  Search, Filter, BarChart3, Users, DollarSign, Target, Calendar, 
  FileText, Package, ArrowUpRight, ArrowDownRight, Clock, ShoppingBag,
  Info, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

// --- DATOS DE EJEMPLO REALISTAS ---
const mockData = {
  clientes: [
    {
      id: 'c001',
      nombrePersonal: 'MEZA VILLAFUERTE FERNANDO',
      nombreSolicitante: 'MANUFACTURAS CHARLES S.R.L.T.D.A.',
      probabilidadCompra: 93,
      ticketPromedio: 199447,
      status: 'active',
      vendedorHistorial: [
        { 
          vendedor: 'MEZA VILLAFUERTE FERNANDO', 
          periodo: '2023-01 a 2025-06', 
          activo: true, 
          ticketPromedio: 199447, 
          probabilidadCompra: 93 
        }
      ],
      ventas: {
        2023: { ene: 27554, feb: 108148, mar: 150276, abr: 331263, may: 0, jun: 27563, jul: 109020, ago: 2832, set: 259032, oct: 95580, nov: 161100, dic: 0 },
        2024: { ene: 34405, feb: 113922, mar: 35509, abr: 16461, may: 68062, jun: 95420, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 },
        2025: { ene: 34405, feb: 113922, mar: 55589, abr: 16461, may: 68062, jun: 95420, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 }
      },
      categorias: [
        {
          nombre: 'CAMISERÍA',
          ventas2023: 800000,
          ventas2024: 400000,
          ventas2025: 350000,
          margen: 22.5,
          articulos: [
            {
              codigo: 'CAM-001',
              descripcion: 'POPELINA LISA BLANCA',
              status: 'active',
              ventas: {
                2023: { ene: 15000, feb: 60000, mar: 80000, abr: 180000, may: 0, jun: 15000, jul: 60000, ago: 0, set: 140000, oct: 50000, nov: 90000, dic: 0 },
                2024: { ene: 20000, feb: 65000, mar: 20000, abr: 10000, may: 40000, jun: 55000, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 },
                2025: { ene: 20000, feb: 65000, mar: 30000, abr: 10000, may: 40000, jun: 55000, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 }
              }
            },
            {
              codigo: 'CAM-002',
              descripcion: 'OXFORD CELESTE',
              status: 'active',
              ventas: {
                2023: { ene: 12554, feb: 48148, mar: 70276, abr: 151263, may: 0, jun: 12563, jul: 49020, ago: 2832, set: 119032, oct: 45580, nov: 71100, dic: 0 },
                2024: { ene: 14405, feb: 48922, mar: 15509, abr: 6461, may: 28062, jun: 40420, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 },
                2025: { ene: 14405, feb: 48922, mar: 25589, abr: 6461, may: 28062, jun: 40420, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 }
              }
            }
          ]
        },
        {
          nombre: 'POLIVISCOSA',
          ventas2023: 400000,
          ventas2024: 200000,
          ventas2025: 180000,
          margen: 18.3,
          articulos: [
            {
              codigo: 'PV-001',
              descripcion: 'POLIVISCOSA LISA NEGRA',
              status: 'active',
              ventas: {
                2023: { ene: 0, feb: 0, mar: 0, abr: 0, may: 0, jun: 0, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 },
                2024: { ene: 0, feb: 0, mar: 0, abr: 0, may: 0, jun: 0, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 },
                2025: { ene: 0, feb: 0, mar: 0, abr: 0, may: 0, jun: 0, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 }
              }
            }
          ]
        }
      ]
    },
    {
      id: 'c002',
      nombrePersonal: 'MEZA VILLAFUERTE FERNANDO',
      nombreSolicitante: 'CORPORACION BROOKLING S.A.C.',
      probabilidadCompra: 60,
      ticketPromedio: 117840,
      status: 'at_risk',
      vendedorHistorial: [
        { 
          vendedor: 'GOMEZ PEREZ JUAN', 
          periodo: '2022-01 a 2023-06', 
          activo: false, 
          ticketPromedio: 85000, 
          probabilidadCompra: 75 
        },
        { 
          vendedor: 'MEZA VILLAFUERTE FERNANDO', 
          periodo: '2023-07 a 2025-06', 
          activo: true, 
          ticketPromedio: 117840, 
          probabilidadCompra: 60 
        }
      ],
      ventas: {
        2023: { ene: 87240, feb: 148440, mar: 0, abr: 0, may: 0, jun: 0, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 },
        2024: { ene: 0, feb: 0, mar: 0, abr: 0, may: 0, jun: 0, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 },
        2025: { ene: 0, feb: 0, mar: 0, abr: 0, may: 0, jun: 0, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 }
      },
      categorias: [
        {
          nombre: 'DRILES',
          ventas2023: 235680,
          ventas2024: 0,
          ventas2025: 0,
          margen: 15.7,
          articulos: [
            {
              codigo: 'DR-001',
              descripcion: 'DRILL BEIGE PESADO',
              status: 'inactive',
              ventas: {
                2023: { ene: 87240, feb: 148440, mar: 0, abr: 0, may: 0, jun: 0, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 },
                2024: { ene: 0, feb: 0, mar: 0, abr: 0, may: 0, jun: 0, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 },
                2025: { ene: 0, feb: 0, mar: 0, abr: 0, may: 0, jun: 0, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 }
              }
            }
          ]
        }
      ]
    },
    {
      id: 'c003',
      nombrePersonal: 'MEZA VILLAFUERTE FERNANDO',
      nombreSolicitante: 'DISEÑOS FILIPPO ALPI S.A.',
      probabilidadCompra: 60,
      ticketPromedio: 39887,
      status: 'active',
      vendedorHistorial: [
        { 
          vendedor: 'RODRIGUEZ SILVA MARIA', 
          periodo: '2023-01 a 2024-12', 
          activo: false, 
          ticketPromedio: 25000, 
          probabilidadCompra: 80 
        },
        { 
          vendedor: 'MEZA VILLAFUERTE FERNANDO', 
          periodo: '2025-01 a 2025-06', 
          activo: true, 
          ticketPromedio: 39887, 
          probabilidadCompra: 60 
        }
      ],
      ventas: {
        2023: { ene: 0, feb: 0, mar: 0, abr: 0, may: 0, jun: 0, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 },
        2024: { ene: 0, feb: 0, mar: 0, abr: 0, may: 0, jun: 0, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 },
        2025: { ene: 0, feb: 0, mar: 0, abr: 39887, may: 0, jun: 0, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 }
      },
      categorias: [
        {
          nombre: 'FORROS',
          ventas2023: 0,
          ventas2024: 0,
          ventas2025: 39887,
          margen: 25.2,
          articulos: [
            {
              codigo: 'FOR-001',
              descripcion: 'FORRO ACETATADO GRIS',
              status: 'active',
              ventas: {
                2023: { ene: 0, feb: 0, mar: 0, abr: 0, may: 0, jun: 0, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 },
                2024: { ene: 0, feb: 0, mar: 0, abr: 0, may: 0, jun: 0, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 },
                2025: { ene: 0, feb: 0, mar: 0, abr: 39887, may: 0, jun: 0, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 }
              }
            }
          ]
        }
      ]
    },
    {
      id: 'c004',
      nombrePersonal: 'GOMEZ PEREZ JUAN',
      nombreSolicitante: 'TEXTILES DEL PACIFICO S.A.C.',
      probabilidadCompra: 85,
      ticketPromedio: 250000,
      status: 'active',
      vendedorHistorial: [
        { 
          vendedor: 'GOMEZ PEREZ JUAN', 
          periodo: '2023-01 a 2025-06', 
          activo: true, 
          ticketPromedio: 250000, 
          probabilidadCompra: 85 
        }
      ],
      ventas: {
        2023: { ene: 180000, feb: 220000, mar: 350000, abr: 280000, may: 150000, jun: 200000, jul: 120000, ago: 80000, set: 320000, oct: 280000, nov: 350000, dic: 180000 },
        2024: { ene: 200000, feb: 250000, mar: 380000, abr: 300000, may: 180000, jun: 220000, jul: 150000, ago: 100000, set: 350000, oct: 300000, nov: 380000, dic: 200000 },
        2025: { ene: 220000, feb: 280000, mar: 400000, abr: 320000, may: 200000, jun: 250000, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 }
      },
      categorias: [
        {
          nombre: 'CAMISERÍA',
          ventas2023: 1500000,
          ventas2024: 1600000,
          ventas2025: 900000,
          margen: 24.1,
          articulos: [
            {
              codigo: 'CAM-003',
              descripcion: 'POPELINA ESTAMPADA',
              status: 'active',
              ventas: {
                2023: { ene: 100000, feb: 120000, mar: 200000, abr: 160000, may: 80000, jun: 110000, jul: 70000, ago: 40000, set: 180000, oct: 160000, nov: 200000, dic: 100000 },
                2024: { ene: 110000, feb: 140000, mar: 220000, abr: 170000, may: 100000, jun: 120000, jul: 85000, ago: 55000, set: 200000, oct: 170000, nov: 220000, dic: 110000 },
                2025: { ene: 120000, feb: 160000, mar: 230000, abr: 180000, may: 110000, jun: 140000, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 }
              }
            }
          ]
        },
        {
          nombre: 'AVIOS',
          ventas2023: 700000,
          ventas2024: 750000,
          ventas2025: 420000,
          margen: 30.5,
          articulos: [
            {
              codigo: 'AV-001',
              descripcion: 'BOTONES POLYESTER',
              status: 'active',
              ventas: {
                2023: { ene: 50000, feb: 60000, mar: 90000, abr: 70000, may: 40000, jun: 55000, jul: 30000, ago: 20000, set: 85000, oct: 70000, nov: 90000, dic: 50000 },
                2024: { ene: 55000, feb: 65000, mar: 95000, abr: 75000, may: 45000, jun: 60000, jul: 35000, ago: 25000, set: 90000, oct: 75000, nov: 95000, dic: 55000 },
                2025: { ene: 60000, feb: 70000, mar: 100000, abr: 80000, may: 50000, jun: 65000, jul: 0, ago: 0, set: 0, oct: 0, nov: 0, dic: 0 }
              }
            }
          ]
        }
      ]
    }
  ]
};

// --- COMPONENTES AUXILIARES ---

// Componente de KPI Card
const KPICard = ({ title, value, change, icon: Icon, trend, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200'
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className="h-5 w-5" />
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          trend === 'up' ? 'bg-green-100 text-green-800' : 
          trend === 'down' ? 'bg-red-100 text-red-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {change}
        </span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm opacity-80">{title}</div>
    </div>
  );
};

// Componente de Análisis de Transferencia Individual
const TransferAnalysisCard = ({ cliente, formatCurrency }) => {
  if (!cliente.vendedorHistorial || cliente.vendedorHistorial.length <= 1) return null;

  const transfers = [];
  for (let i = 0; i < cliente.vendedorHistorial.length - 1; i++) {
    const from = cliente.vendedorHistorial[i];
    const to = cliente.vendedorHistorial[i + 1];
    transfers.push({
      from,
      to,
      impact: {
        ticketPromedio: {
          antes: from.ticketPromedio,
          despues: to.ticketPromedio,
          variacion: ((to.ticketPromedio - from.ticketPromedio) / from.ticketPromedio * 100)
        },
        probabilidad: {
          antes: from.probabilidadCompra,
          despues: to.probabilidadCompra,
          variacion: to.probabilidadCompra - from.probabilidadCompra
        }
      }
    });
  }

  return (
    <div className="bg-white p-5 rounded-lg border border-orange-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{cliente.nombreSolicitante}</h3>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          cliente.status === 'active' ? 'bg-green-100 text-green-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {cliente.status === 'active' ? 'Activo' : 'En Riesgo'}
        </span>
      </div>
      
      {transfers.map((transfer, idx) => (
        <div key={idx} className="mb-4 p-3 bg-gray-50 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm">
              <span className="text-gray-600">De:</span>
              <span className="font-medium text-red-700 ml-1">{transfer.from.vendedor}</span>
            </div>
            <div className="text-xs text-gray-500">{transfer.from.periodo}</div>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm">
              <span className="text-gray-600">A:</span>
              <span className="font-medium text-green-700 ml-1">{transfer.to.vendedor}</span>
            </div>
            <div className="text-xs text-gray-500">{transfer.to.periodo}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-blue-50 p-2 rounded">
              <div className="font-medium text-blue-900 mb-1">Ticket Promedio</div>
              <div className="text-blue-700">Antes: {formatCurrency(transfer.impact.ticketPromedio.antes)}</div>
              <div className="text-blue-700">Después: {formatCurrency(transfer.impact.ticketPromedio.despues)}</div>
              <div className={`font-medium mt-1 ${
                transfer.impact.ticketPromedio.variacion > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {transfer.impact.ticketPromedio.variacion > 0 ? '↗' : '↘'} {
                  Math.abs(transfer.impact.ticketPromedio.variacion).toFixed(1)
                }%
              </div>
            </div>
            
            <div className="bg-purple-50 p-2 rounded">
              <div className="font-medium text-purple-900 mb-1">Probabilidad Compra</div>
              <div className="text-purple-700">Antes: {transfer.impact.probabilidad.antes}%</div>
              <div className="text-purple-700">Después: {transfer.impact.probabilidad.despues}%</div>
              <div className={`font-medium mt-1 ${
                transfer.impact.probabilidad.variacion > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {transfer.impact.probabilidad.variacion > 0 ? '↗' : '↘'} {
                  Math.abs(transfer.impact.probabilidad.variacion).toFixed(1)
                } pts
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Componente de Análisis de Estacionalidad
const SeasonalityAnalysis = ({ cliente, formatCurrency }) => {
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'dic'];
  
  const analyzeSeasonality = (ventas) => {
    const salesByMonth = months.map(month => {
      const sales2023 = ventas['2023']?.[month] || 0;
      const sales2024 = ventas['2024']?.[month] || 0;
      const sales2025 = ventas['2025']?.[month] || 0;
      const average = (sales2023 + sales2024 + sales2025) / 3;
      
      return {
        month,
        sales2023,
        sales2024,
        sales2025,
        average
      };
    });
    
    const totalAverage = salesByMonth.reduce((sum, m) => sum + m.average, 0) / 12;
    const picos = salesByMonth
      .filter(m => m.average > totalAverage * 1.5)
      .sort((a, b) => b.average - a.average);
    const valles = salesByMonth
      .filter(m => m.average < totalAverage * 0.5)
      .sort((a, b) => a.average - b.average);
    
    return { salesByMonth, picos, valles, totalAverage };
  };
  
  const getSeasonalityColor = (value, average) => {
    if (value === 0) return 'bg-gray-100 text-gray-500';
    if (value > average * 2) return 'bg-red-100 text-red-800';
    if (value > average * 1.5) return 'bg-orange-100 text-orange-800';
    if (value > average * 1.1) return 'bg-yellow-100 text-yellow-800';
    if (value < average * 0.3) return 'bg-blue-100 text-blue-800';
    if (value < average * 0.7) return 'bg-cyan-100 text-cyan-800';
    return 'bg-green-100 text-green-800';
  };
  
  const getSeasonalityIcon = (value, average) => {
    if (value === 0) return '⭕';
    if (value > average * 2) return '🔥';
    if (value > average * 1.5) return '📈';
    if (value < average * 0.3) return '❄️';
    if (value < average * 0.7) return '📉';
    return '➖';
  };
  
  const seasonalData = analyzeSeasonality(cliente.ventas);
  
  return (
    <div className="bg-white p-6 rounded-lg border border-blue-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 text-lg">{cliente.nombreSolicitante}</h3>
        <div className="text-right">
          <div className="text-sm text-gray-600">Promedio Mensual</div>
          <div className="text-lg font-bold text-blue-900">{formatCurrency(seasonalData.totalAverage)}</div>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-3 text-center">Evolución Mensual (Promedio 2023-2025)</h4>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
          {seasonalData.salesByMonth.map((monthData) => (
            <div key={monthData.month} className="text-center">
              <div className={`p-2 rounded-lg text-xs font-medium ${getSeasonalityColor(monthData.average, seasonalData.totalAverage)}`}>
                <div className="text-lg mb-1">{getSeasonalityIcon(monthData.average, seasonalData.totalAverage)}</div>
                <div className="font-bold">{monthData.month.toUpperCase()}</div>
                <div className="text-xs">{formatCurrency(monthData.average).replace('S/ ', '')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h5 className="font-medium text-green-900 mb-2 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Meses Pico
          </h5>
          {seasonalData.picos.length > 0 ? (
            seasonalData.picos.map(p => (
              <div key={p.month} className="flex justify-between text-sm mb-1">
                <span className="font-medium capitalize">{p.month}</span>
                <span className="text-green-700">{formatCurrency(p.average)}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Sin picos identificados</p>
          )}
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-2 flex items-center">
            <TrendingDown className="h-4 w-4 mr-2" />
            Meses Valle
          </h5>
          {seasonalData.valles.length > 0 ? (
            seasonalData.valles.map(v => (
              <div key={v.month} className="flex justify-between text-sm mb-1">
                <span className="font-medium capitalize">{v.month}</span>
                <span className="text-blue-700">{formatCurrency(v.average)}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Sin valles identificados</p>
          )}
        </div>
      </div>
      
      {/* Recomendaciones automáticas */}
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
        <h5 className="font-medium text-yellow-900 text-sm mb-2 flex items-center">
          <Info className="h-4 w-4 mr-2" />
          Recomendaciones
        </h5>
        <ul className="text-xs text-yellow-800 space-y-1">
          {seasonalData.picos.length > 0 && (
            <li>• Preparar stock adicional para {seasonalData.picos.map(p => p.month.toUpperCase()).join(', ')}</li>
          )}
          {seasonalData.valles.length > 0 && (
            <li>• Considerar promociones en {seasonalData.valles.map(v => v.month.toUpperCase()).join(', ')}</li>
          )}
          {cliente.status === 'at_risk' && (
            <li>• Cliente en riesgo: Realizar visita comercial urgente</li>
          )}
        </ul>
      </div>
    </div>
  );
};

// Componente de Fila de Cliente con Drill-Down
const ClientRow = ({ cliente, formatCurrency }) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  
  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };
  
  const calculateTotalSales = (ventas) => {
    const total2023 = Object.values(ventas['2023'] || {}).reduce((sum, val) => sum + val, 0);
    const total2024 = Object.values(ventas['2024'] || {}).reduce((sum, val) => sum + val, 0);
    const total2025 = Object.values(ventas['2025'] || {}).reduce((sum, val) => sum + val, 0);
    return { total2023, total2024, total2025 };
  };
  
  const totals = calculateTotalSales(cliente.ventas);
  
  return (
    <>
      <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <td className="px-4 py-3">
          <div className="flex items-center">
            {expanded ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
            <div>
              <div className="font-medium text-gray-900">{cliente.nombreSolicitante}</div>
              <div className="text-xs text-gray-500">{cliente.nombrePersonal}</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            cliente.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {cliente.status === 'active' ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
            {cliente.status === 'active' ? 'Activo' : 'En Riesgo'}
          </span>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center">
            <Target className="h-4 w-4 mr-1 text-purple-500" />
            <span className="font-medium">{cliente.probabilidadCompra}%</span>
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="font-medium">{formatCurrency(cliente.ticketPromedio)}</div>
        </td>
        <td className="px-4 py-3">{formatCurrency(totals.total2024)}</td>
        <td className="px-4 py-3">{formatCurrency(totals.total2025)}</td>
        <td className="px-4 py-3">
          {cliente.vendedorHistorial.length > 1 && (
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
              {cliente.vendedorHistorial.length} cambios
            </span>
          )}
        </td>
      </tr>
      
      {expanded && (
        <tr>
          <td colSpan="7" className="px-4 py-0">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              {/* Categorías */}
              <div className="space-y-3">
                {cliente.categorias.map((categoria) => (
                  <div key={categoria.nombre} className="bg-white rounded-lg border border-gray-200">
                    <div 
                      className="p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleCategory(categoria.nombre)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {expandedCategories[categoria.nombre] ? 
                            <ChevronDown className="h-4 w-4 mr-2" /> : 
                            <ChevronRight className="h-4 w-4 mr-2" />
                          }
                          <Package className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="font-medium">{categoria.nombre}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div>
                            <span className="text-gray-500">2024:</span>
                            <span className="font-medium ml-1">{formatCurrency(categoria.ventas2024)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">2025:</span>
                            <span className="font-medium ml-1">{formatCurrency(categoria.ventas2025)}</span>
                          </div>
                          <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            Margen: {categoria.margen}%
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {expandedCategories[categoria.nombre] && (
                      <div className="px-3 pb-3">
                        <div className="bg-gray-50 rounded p-3 space-y-2">
                          {categoria.articulos.map((articulo) => {
                            const artTotals = calculateTotalSales(articulo.ventas);
                            return (
                              <div key={articulo.codigo} className="bg-white p-3 rounded border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                  <div>
                                    <div className="font-medium text-sm">{articulo.descripcion}</div>
                                    <div className="text-xs text-gray-500">{articulo.codigo}</div>
                                  </div>
                                  <span className={`text-xs px-2 py-1 rounded ${
                                    articulo.status === 'active' ? 
                                    'bg-green-100 text-green-800' : 
                                    'bg-gray-100 text-gray-600'
                                  }`}>
                                    {articulo.status === 'active' ? 'Activo' : 'Inactivo'}
                                  </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                  <div className="text-center">
                                    <div className="text-gray-500">2023</div>
                                    <div className="font-medium">{formatCurrency(artTotals.total2023)}</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-gray-500">2024</div>
                                    <div className="font-medium">{formatCurrency(artTotals.total2024)}</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-gray-500">2025</div>
                                    <div className="font-medium">{formatCurrency(artTotals.total2025)}</div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

// --- COMPONENTE PRINCIPAL ---
const TextilePortfolioApp = () => {
  // Estados
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTransferAnalysis, setShowTransferAnalysis] = useState(false);
  const [showSeasonalityAnalysis, setShowSeasonalityAnalysis] = useState(false);
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, transfers, seasonality, predictions
  
  // Funciones de utilidad
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return 'S/ 0';
    if (amount < 0) return `-S/ ${Math.abs(amount).toLocaleString('es-PE', { minimumFractionDigits: 0 })}`;
    return `S/ ${amount.toLocaleString('es-PE', { minimumFractionDigits: 0 })}`;
  };
  
  // Función para calcular predicciones
  const calculatePredictions = useCallback((cliente) => {
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'dic'];
    const currentMonth = 6; // Julio = índice 6 (estamos en julio 2025)
    
    // Calcular factores estacionales basados en datos históricos
    const seasonalFactors = {};
    months.forEach((month, idx) => {
      const sales2023 = cliente.ventas['2023']?.[month] || 0;
      const sales2024 = cliente.ventas['2024']?.[month] || 0;
      
      // Calcular promedio anual para cada año
      const total2023 = Object.values(cliente.ventas['2023'] || {}).reduce((s, v) => s + v, 0);
      const total2024 = Object.values(cliente.ventas['2024'] || {}).reduce((s, v) => s + v, 0);
      const avg2023 = total2023 / 12;
      const avg2024 = total2024 / 12;
      
      // Factor estacional = ventas del mes / promedio mensual
      const factor2023 = avg2023 > 0 ? sales2023 / avg2023 : 0;
      const factor2024 = avg2024 > 0 ? sales2024 / avg2024 : 0;
      
      // Promedio de factores (con más peso al año más reciente)
      seasonalFactors[month] = (factor2023 * 0.3 + factor2024 * 0.7);
    });
    
    // Calcular venta base mensual esperada
    const ventaBaseMensual = cliente.ticketPromedio * (cliente.probabilidadCompra / 100);
    
    // Generar predicciones
    const predictions = {};
    months.forEach((month, idx) => {
      if (idx >= currentMonth) { // Solo predecir de julio en adelante
        predictions[month] = Math.round(ventaBaseMensual * seasonalFactors[month]);
      }
    });
    
    // Comparar con ventas reales para los meses que ya tienen datos
    const actualVsPredicted = {};
    months.forEach((month, idx) => {
      if (idx < currentMonth && cliente.ventas['2025']?.[month]) {
        const actual = cliente.ventas['2025'][month];
        const predicted = Math.round(ventaBaseMensual * seasonalFactors[month]);
        actualVsPredicted[month] = {
          actual,
          predicted,
          variance: actual > 0 ? ((actual - predicted) / predicted * 100) : 0,
          accuracy: actual > 0 ? (100 - Math.abs((actual - predicted) / predicted * 100)) : 0
        };
      }
    });
    
    return {
      seasonalFactors,
      ventaBaseMensual,
      predictions,
      actualVsPredicted
    };
  }, []);
  
  // Componente de Predicciones
  const PredictionAnalysis = ({ cliente }) => {
    const analysis = calculatePredictions(cliente);
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'dic'];
    const monthNames = {
      ene: 'Enero', feb: 'Febrero', mar: 'Marzo', abr: 'Abril',
      may: 'Mayo', jun: 'Junio', jul: 'Julio', ago: 'Agosto',
      set: 'Septiembre', oct: 'Octubre', nov: 'Noviembre', dic: 'Diciembre'
    };
    
    // Calcular precisión promedio
    const accuracyValues = Object.values(analysis.actualVsPredicted).map(v => v.accuracy);
    const avgAccuracy = accuracyValues.length > 0 ? 
      accuracyValues.reduce((sum, acc) => sum + acc, 0) / accuracyValues.length : 0;
    
    // Calcular total predicho para el resto del año
    const totalPredicted = Object.values(analysis.predictions).reduce((sum, val) => sum + val, 0);
    
    return (
      <div className="bg-white p-6 rounded-lg border border-purple-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 text-lg">{cliente.nombreSolicitante}</h3>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">Precisión Promedio</div>
              <div className={`text-lg font-bold ${
                avgAccuracy >= 80 ? 'text-green-600' : 
                avgAccuracy >= 60 ? 'text-yellow-600' : 
                'text-red-600'
              }`}>
                {avgAccuracy.toFixed(1)}%
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Predicción Jul-Dic</div>
              <div className="text-lg font-bold text-purple-900">{formatCurrency(totalPredicted)}</div>
            </div>
          </div>
        </div>
        
        {/* Análisis de precisión histórica */}
        {Object.keys(analysis.actualVsPredicted).length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-3">Precisión de Predicciones 2025 (Ene-Jun)</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {months.slice(0, 6).map((month) => {
                const data = analysis.actualVsPredicted[month];
                if (!data) return null;
                
                return (
                  <div key={month} className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs font-medium text-gray-600 mb-1">{monthNames[month]}</div>
                    <div className="space-y-1">
                      <div className="text-xs">
                        <span className="text-gray-500">Real:</span>
                        <span className="font-medium ml-1">{formatCurrency(data.actual).replace('S/ ', '')}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-500">Pred:</span>
                        <span className="font-medium ml-1">{formatCurrency(data.predicted).replace('S/ ', '')}</span>
                      </div>
                      <div className={`text-xs font-bold ${
                        data.accuracy >= 80 ? 'text-green-600' : 
                        data.accuracy >= 60 ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {data.accuracy.toFixed(0)}% precisión
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Vista de Predicciones */}
        {activeView === 'predictions' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-purple-900">Predicciones de Ventas (Jul-Dic 2025)</h2>
                <div className="flex items-center text-sm text-purple-700">
                  <Info className="h-4 w-4 mr-2" />
                  Basado en ticket promedio, probabilidad y estacionalidad histórica
                </div>
              </div>
              
              {/* Resumen General de Predicciones */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-purple-100">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Jul-Dic</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900">
                    {formatCurrency(
                      filteredClients.reduce((sum, cliente) => {
                        const pred = calculatePredictions(cliente);
                        return sum + Object.values(pred.predictions).reduce((s, v) => s + v, 0);
                      }, 0)
                    )}
                  </div>
                  <div className="text-sm text-purple-700">Total Predicho</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Promedio</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">
                    {(() => {
                      const accuracies = filteredClients.map(cliente => {
                        const pred = calculatePredictions(cliente);
                        const values = Object.values(pred.actualVsPredicted).map(v => v.accuracy);
                        return values.length > 0 ? values.reduce((s, v) => s + v, 0) / values.length : 0;
                      });
                      return accuracies.length > 0 ? 
                        (accuracies.reduce((s, v) => s + v, 0) / accuracies.length).toFixed(1) + '%' : '0%';
                    })()}
                  </div>
                  <div className="text-sm text-green-700">Precisión Histórica</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-orange-100">
                  <div className="flex items-center justify-between mb-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Mejor mes</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-900">Noviembre</div>
                  <div className="text-sm text-orange-700">Mayor predicción</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-red-100">
                  <div className="flex items-center justify-between mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Alerta</span>
                  </div>
                  <div className="text-2xl font-bold text-red-900">2</div>
                  <div className="text-sm text-red-700">Clientes con baja precisión</div>
                </div>
              </div>
              
              {/* Predicciones por Cliente */}
              <div className="space-y-6">
                {filteredClients.map((cliente) => (
                  <PredictionAnalysis key={cliente.id} cliente={cliente} />
                ))}
              </div>
            </div>
            
            {/* Gráfico comparativo de predicciones */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparativo de Predicciones por Mes</h3>
              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-7 gap-4">
                    <div className="font-medium text-sm text-gray-600">Cliente</div>
                    {['jul', 'ago', 'set', 'oct', 'nov', 'dic'].map(month => (
                      <div key={month} className="font-medium text-sm text-gray-600 text-center capitalize">
                        {month}
                      </div>
                    ))}
                  </div>
                  {filteredClients.map((cliente) => {
                    const pred = calculatePredictions(cliente);
                    return (
                      <div key={cliente.id} className="grid grid-cols-7 gap-4 mt-3 items-center">
                        <div className="text-sm truncate">{cliente.nombreSolicitante}</div>
                        {['jul', 'ago', 'set', 'oct', 'nov', 'dic'].map(month => (
                          <div key={month} className="text-center">
                            <div className={`text-sm font-medium px-2 py-1 rounded ${
                              pred.seasonalFactors[month] > 1.5 ? 'bg-green-100 text-green-800' :
                              pred.seasonalFactors[month] < 0.5 ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {formatCurrency(pred.predictions[month] || 0).replace('S/ ', '')}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Predicciones futuras */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-3">Predicciones de Ventas (Jul-Dic 2025)</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {months.slice(6).map((month) => {
              const predicted = analysis.predictions[month] || 0;
              const factor = analysis.seasonalFactors[month] || 0;
              
              return (
                <div key={month} className={`p-3 rounded-lg ${
                  factor > 1.5 ? 'bg-green-50 border border-green-200' :
                  factor < 0.5 ? 'bg-red-50 border border-red-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="text-xs font-medium text-gray-700 mb-1">{monthNames[month]}</div>
                  <div className="text-lg font-bold text-gray-900">
                    {formatCurrency(predicted).replace('S/ ', '')}
                  </div>
                  <div className="text-xs text-gray-600">
                    Factor: {factor.toFixed(2)}x
                  </div>
                  {factor > 1.5 && <div className="text-xs text-green-600 mt-1">📈 Temporada alta</div>}
                  {factor < 0.5 && <div className="text-xs text-red-600 mt-1">📉 Temporada baja</div>}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Detalles del cálculo */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h5 className="font-medium text-gray-700 mb-2">Base de Cálculo</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-gray-600">Ticket Promedio:</span>
              <span className="font-medium ml-2">{formatCurrency(cliente.ticketPromedio)}</span>
            </div>
            <div>
              <span className="text-gray-600">Probabilidad:</span>
              <span className="font-medium ml-2">{cliente.probabilidadCompra}%</span>
            </div>
            <div>
              <span className="text-gray-600">Venta Base Mensual:</span>
              <span className="font-medium ml-2">{formatCurrency(analysis.ventaBaseMensual)}</span>
            </div>
          </div>
        </div>
        
        {/* Recomendaciones basadas en predicciones */}
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
          <h5 className="font-medium text-yellow-900 text-sm mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Recomendaciones Basadas en Predicciones
          </h5>
          <ul className="text-xs text-yellow-800 space-y-1">
            {avgAccuracy < 70 && (
              <li>• Baja precisión histórica ({avgAccuracy.toFixed(0)}%) - Revisar factores externos que afectan las ventas</li>
            )}
            {analysis.seasonalFactors['nov'] > 1.5 && (
              <li>• Preparar inventario adicional para Noviembre (factor estacional alto: {analysis.seasonalFactors['nov'].toFixed(2)}x)</li>
            )}
            {totalPredicted < cliente.ticketPromedio * 3 && (
              <li>• Ventas proyectadas bajas - Considerar estrategias de activación</li>
            )}
            {cliente.status === 'at_risk' && (
              <li>• Cliente en riesgo - Las predicciones podrían no cumplirse sin intervención comercial</li>
            )}
          </ul>
        </div>
      </div>
    );
  };
  
  // Cálculos de KPIs
  const calculateKPIs = useMemo(() => {
    const filteredClients = mockData.clientes.filter(cliente => 
      (selectedVendor === 'all' || cliente.nombrePersonal === selectedVendor) &&
      cliente.nombreSolicitante.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const ventas2024 = filteredClients.reduce((sum, cliente) => {
      const total = Object.values(cliente.ventas['2024'] || {}).reduce((s, v) => s + v, 0);
      return sum + total;
    }, 0);
    
    const ventas2025 = filteredClients.reduce((sum, cliente) => {
      const total = Object.values(cliente.ventas['2025'] || {}).reduce((s, v) => s + v, 0);
      return sum + total;
    }, 0);
    
    const clientesEnRiesgo = filteredClients.filter(c => c.status === 'at_risk').length;
    const probabilidadPromedio = filteredClients.reduce((sum, c) => sum + c.probabilidadCompra, 0) / (filteredClients.length || 1);
    
    return {
      ventas2024,
      ventas2025,
      clientesEnRiesgo,
      probabilidadPromedio: Math.round(probabilidadPromedio)
    };
  }, [selectedVendor, searchTerm]);
  
  // Filtrado de clientes
  const filteredClients = useMemo(() => {
    return mockData.clientes.filter(cliente => 
      (selectedVendor === 'all' || cliente.nombrePersonal === selectedVendor) &&
      cliente.nombreSolicitante.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedVendor, searchTerm]);
  
  // Clientes con transferencias
  const clientsWithTransfers = mockData.clientes.filter(
    c => c.vendedorHistorial && c.vendedorHistorial.length > 1
  );
  
  // Obtener lista única de vendedores
  const uniqueVendors = useMemo(() => {
    const vendors = new Set();
    mockData.clientes.forEach(cliente => {
      vendors.add(cliente.nombrePersonal);
      cliente.vendedorHistorial?.forEach(h => vendors.add(h.vendedor));
    });
    return Array.from(vendors).sort();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Dashboard de Análisis Textil</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeView === 'dashboard' ? 
                  'bg-blue-100 text-blue-800' : 
                  'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="h-4 w-4 inline mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveView('transfers')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeView === 'transfers' ? 
                  'bg-orange-100 text-orange-800' : 
                  'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Users className="h-4 w-4 inline mr-2" />
                Transferencias
              </button>
              <button
                onClick={() => setActiveView('seasonality')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeView === 'seasonality' ? 
                  'bg-blue-100 text-blue-800' : 
                  'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Calendar className="h-4 w-4 inline mr-2" />
                Estacionalidad
              </button>
              <button
                onClick={() => setActiveView('predictions')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeView === 'predictions' ? 
                  'bg-purple-100 text-purple-800' : 
                  'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="h-4 w-4 inline mr-2" />
                Predicciones
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-64">
              <select
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los vendedores</option>
                {uniqueVendors.map(vendor => (
                  <option key={vendor} value={vendor}>{vendor}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Vista Dashboard */}
        {activeView === 'dashboard' && (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <KPICard
                title="Ventas 2024"
                value={formatCurrency(calculateKPIs.ventas2024)}
                change="+12.5%"
                icon={DollarSign}
                trend="up"
                color="green"
              />
              <KPICard
                title="Ventas 2025 YTD"
                value={formatCurrency(calculateKPIs.ventas2025)}
                change="+8.3%"
                icon={TrendingUp}
                trend="up"
                color="blue"
              />
              <KPICard
                title="Clientes en Riesgo"
                value={calculateKPIs.clientesEnRiesgo}
                change="-2"
                icon={AlertTriangle}
                trend="down"
                color="red"
              />
              <KPICard
                title="Probabilidad Promedio"
                value={`${calculateKPIs.probabilidadPromedio}%`}
                change="+5%"
                icon={Target}
                trend="up"
                color="orange"
              />
            </div>
            
            {/* Tabla de Clientes */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Cartera de Clientes</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Probabilidad
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ticket Promedio
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ventas 2024
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ventas 2025
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transferencias
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredClients.map((cliente) => (
                      <ClientRow 
                        key={cliente.id} 
                        cliente={cliente} 
                        formatCurrency={formatCurrency}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        
        {/* Vista de Transferencias */}
        {activeView === 'transfers' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-orange-900 mb-6">Análisis de Transferencias de Vendedores</h2>
              
              {clientsWithTransfers.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {clientsWithTransfers.map((cliente) => (
                    <TransferAnalysisCard 
                      key={cliente.id} 
                      cliente={cliente} 
                      formatCurrency={formatCurrency}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No se encontraron transferencias de vendedores</p>
                </div>
              )}
            </div>
            
            {/* Resumen de impacto */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Impacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-900">2</div>
                  <div className="text-sm text-red-700">Transferencias Negativas</div>
                  <div className="text-xs text-red-600 mt-1">Disminución en probabilidad</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-900">1</div>
                  <div className="text-sm text-green-700">Transferencias Positivas</div>
                  <div className="text-xs text-green-600 mt-1">Aumento en ticket promedio</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-900">S/ 157,727</div>
                  <div className="text-sm text-yellow-700">Impacto Total</div>
                  <div className="text-xs text-yellow-600 mt-1">Cambio en ventas anuales</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Vista de Estacionalidad */}
        {activeView === 'seasonality' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-6">Análisis de Estacionalidad por Cliente</h2>
              
              <div className="space-y-6">
                {filteredClients.map((cliente) => (
                  <SeasonalityAnalysis
                    key={cliente.id}
                    cliente={cliente}
                    formatCurrency={formatCurrency}
                  />
                ))}
              </div>
            </div>
            
            {/* Patrones generales */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Patrones Estacionales Identificados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Temporada Alta</h4>
                  <p className="text-sm text-green-700">Feb - Mar - Abr</p>
                  <p className="text-xs text-green-600 mt-1">Inicio de temporada escolar y corporativa</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Temporada Baja</h4>
                  <p className="text-sm text-blue-700">Jul - Ago - Dic</p>
                  <p className="text-xs text-blue-600 mt-1">Vacaciones y fin de año</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Picos Secundarios</h4>
                  <p className="text-sm text-purple-700">Sep - Nov</p>
                  <p className="text-xs text-purple-600 mt-1">Campañas y eventos especiales</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextilePortfolioApp;