import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';

import { groupBy } from '../utils/helpers';
import getPlan from '../store/plan/getPlan';
import PlanList from '../components/Plan/PlanList';

const Plan = () => {
  const dispatch = useDispatch();
  const { plan, loading, firstLoading } = useSelector((state) => state.plan);

  useEffect(() => {
    dispatch(getPlan());
  }, [dispatch]);

  let planList = plan.slice();

  planList = groupBy(
    planList.sort(
      (a, b) => a.day - b.day || a.startTime.localeCompare(b.startTime)
    ),
    'day'
  );

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading && firstLoading && !plan.length}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <PlanList planList={planList} />
    </>
  );
};

export default Plan;
