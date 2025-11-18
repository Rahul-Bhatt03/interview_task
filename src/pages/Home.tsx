export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here's what's happening today.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '2,543', change: '+12%', color: 'blue' },
          { label: 'Revenue', value: '$45,231', change: '+8%', color: 'green' },
          { label: 'Projects', value: '124', change: '+23%', color: 'purple' },
          { label: 'Tasks', value: '89', change: '-5%', color: 'orange' },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
          >
            <p className="text-slate-600 text-sm font-medium mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</p>
            <p className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};