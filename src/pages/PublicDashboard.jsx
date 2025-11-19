import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import {
  Trophy,
  Users,
  Building2,
  Vote,
  Activity,
  RefreshCcw,
  TrendingUp
} from 'lucide-react';
import { candidates } from '../data/candidates';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const PublicDashboard = () => {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalVotes: 0,
    totalDepartments: 0,
    presidentCounts: {},
    treasurerCounts: {},
    departmentCounts: {}
  });

  const fetchVotes = async () => {
    setLoading(true);
    try {
      let allVotes = [];
      let hasMore = true;
      let page = 0;
      const pageSize = 1000;

      while (hasMore) {
        const { data, error } = await supabase
          .from('votes')
          .select('*')
          .range(page * pageSize, (page + 1) * pageSize - 1);

        if (error) throw error;

        if (data) {
          allVotes = [...allVotes, ...data];
          if (data.length < pageSize) {
            hasMore = false;
          }
          page++;
        } else {
          hasMore = false;
        }
      }

      processVotes(allVotes);
      setVotes(allVotes);
    } catch (error) {
      console.error('Error fetching votes:', error);
    } finally {
      setLoading(false);
    }
  };

  const processVotes = (data) => {
    // Initialize counts with 0 for all candidates
    const pCounts = {};
    if (candidates.president) {
      candidates.president.forEach(c => pCounts[c.name] = 0);
    }

    const tCounts = {};
    if (candidates.treasurer) {
      candidates.treasurer.forEach(c => tCounts[c.name] = 0);
    }

    const dCounts = {};
    const departments = new Set();

    data.forEach(vote => {
      // President counts
      if (pCounts.hasOwnProperty(vote.president)) {
        pCounts[vote.president]++;
      } else {
        // Handle write-ins or unknown candidates if necessary
        pCounts[vote.president] = (pCounts[vote.president] || 0) + 1;
      }

      // Treasurer counts - Filtered to only show candidates in the list
      if (tCounts.hasOwnProperty(vote.treasurer)) {
        tCounts[vote.treasurer]++;
      }

      // Department counts
      if (vote.department) {
        dCounts[vote.department] = (dCounts[vote.department] || 0) + 1;
        departments.add(vote.department);
      }
    });

    setStats({
      totalVotes: data.length,
      totalDepartments: departments.size,
      presidentCounts: pCounts,
      treasurerCounts: tCounts,
      departmentCounts: dCounts
    });
  };

  useEffect(() => {
    fetchVotes();

    // Set up real-time subscription
    const subscription = supabase
      .channel('public:votes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'votes' }, (payload) => {
        fetchVotes();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getLeader = (counts) => {
    if (Object.keys(counts).length === 0) return { name: 'No Votes', count: 0 };
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return { name: sorted[0][0], count: sorted[0][1] };
  };

  const getSortedCounts = (counts) => {
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading && votes.length === 0) {
    return (
      <DashboardLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
            <p className="text-slate-500 font-medium">Loading election data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const presidentLeader = getLeader(stats.presidentCounts);
  const treasurerLeader = getLeader(stats.treasurerCounts);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">

        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
            <p className="text-slate-500">Last updated: {new Date().toLocaleTimeString()}</p>
          </div>
          <Button
            onClick={fetchVotes}
            variant="outline"
            className="gap-2"
          >
            <RefreshCcw size={16} />
            Refresh Data
          </Button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Stats Cards */}
          <StatsCard
            title="Total Votes Cast"
            value={stats.totalVotes.toLocaleString()}
            icon={<Vote className="h-5 w-5 text-blue-600" />}
            trend="+12% from last hour"
          />
          <StatsCard
            title="Active Departments"
            value={stats.totalDepartments}
            icon={<Building2 className="h-5 w-5 text-purple-600" />}
            trend="All departments active"
          />
          <LeaderCard
            title="Presidential Lead"
            name={presidentLeader.name}
            count={presidentLeader.count}
            total={stats.totalVotes}
            icon={<Trophy className="h-5 w-5 text-yellow-600" />}
          />
          <LeaderCard
            title="Treasurer Lead"
            name={treasurerLeader.name}
            count={treasurerLeader.count}
            total={stats.totalVotes}
            icon={<Activity className="h-5 w-5 text-green-600" />}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* President Results */}
          <ResultSection
            title="Presidential Race"
            description="Live vote count for Presidential candidates"
            counts={stats.presidentCounts}
            total={stats.totalVotes}
            icon={<Users className="h-5 w-5" />}
          />

          {/* Treasurer Results */}
          <ResultSection
            title="Treasurer Race"
            description="Live vote count for Treasurer candidates"
            counts={stats.treasurerCounts}
            total={stats.totalVotes}
            icon={<Users className="h-5 w-5" />}
          />
        </div>

        {/* Department Breakdown */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-slate-500" />
              Department Participation
            </CardTitle>
            <CardDescription>
              Voting distribution across different university departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getSortedCounts(stats.departmentCounts).map(([dept, count]) => (
                <div key={dept} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="font-medium text-slate-700 truncate pr-2 text-sm" title={dept}>{dept}</span>
                    <span className="font-bold text-slate-900 text-sm">{count}</span>
                  </div>
                  <Progress value={(count / stats.totalVotes) * 100} className="h-2" />
                  <p className="text-xs text-slate-400 text-right">
                    {((count / stats.totalVotes) * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
};

const StatsCard = ({ title, value, icon, trend }) => (
  <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
          <TrendingUp size={12} />
          {trend}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

const LeaderCard = ({ title, name, count, total, icon }) => (
  <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3 opacity-10">
        {icon}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold text-slate-900 truncate" title={name}>{name}</div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary" className="font-bold">
            {count} votes
          </Badge>
          <span className="text-xs text-slate-400">
            ({total > 0 ? ((count / total) * 100).toFixed(1) : 0}%)
          </span>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const ResultSection = ({ title, description, counts, total, icon }) => {
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
      <Card className="border-slate-200 shadow-sm h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {sorted.map(([name, count], index) => (
            <div key={name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold border
                    ${index === 0 ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-slate-50 border-slate-200 text-slate-600'}
                  `}>
                    {index + 1}
                  </div>
                  <span className={`font-medium ${index === 0 ? 'text-slate-900' : 'text-slate-700'}`}>
                    {name}
                  </span>
                  {index === 0 && <Trophy size={14} className="text-yellow-500" />}
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900">{count}</span>
                  <span className="text-xs text-slate-400 ml-1">votes</span>
                </div>
              </div>
              <Progress
                value={(count / total) * 100}
                className={`h-2 ${index === 0 ? '[&>div]:bg-green-600' : ''}`}
              />
            </div>
          ))}
          {sorted.length === 0 && (
            <p className="text-slate-400 text-center py-4">No votes yet</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PublicDashboard;
