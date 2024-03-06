import React, { lazy, Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import AppLayout from './AppLayout';
import { useEffect } from 'react';
import Dashboard from './Dashboard';
const Routes = () => {
  const requestedUrl = '/app/';
//   const orgs = useSelector(({ orgs }) => orgs);
//   const org = useSelector(({ org }) => org);
  const [routes, setRoutes] = useState([]);
  const prePermissions = useSelector(({ permissions }) => permissions);
  const getRoutes = () => {
    setTimeout(() => {
      let tempRoutes = [];
      <Route path={requestedUrl + `dashboard`} component={Dashboard} />
    //   var permissions = data.permissions === undefined ? prePermissions : data.permissions
    //   tempRoutes.push(<Route path={requestedUrl + `dashboard`} component={Dashboard} />);
    //   Array.isArray(orgs) && orgs.map((data) => {
    //     if (org?._id === data._id) {
    //       var permissions = data.permissions === undefined ? prePermissions : data.permissions
    //       tempRoutes.push(<Route path={requestedUrl + `dashboard`} component={Dashboard} />);
    //       if (permissions.list_performance) {
    //         tempRoutes.push(<Route path={requestedUrl + `functional_tests`} component={ListPerformanceTests} exact />);
    //       }
    //       if (permissions.list_performance) {
    //         tempRoutes.push(<Route path={requestedUrl + `performance_tests`} component={ListPerformanceTestsNew} exact />);
    //         tempRoutes.push(<Route path={requestedUrl + `performance-history/report/:id`} component={PerFormanceReport} />);
    //         tempRoutes.push(<Route path={requestedUrl + `performance-history/:id`} component={PerformanceHistory} />);
    //         tempRoutes.push(<Route path={requestedUrl + `performance_tests/add`} exact component={PerformanceTestsEditor} />);
    //         tempRoutes.push(<Route path={requestedUrl + `performance_tests/editor/:id`} exact component={PerformanceTestsEditor} />);
    //         tempRoutes.push(<Route path={requestedUrl + `functional_tests/editor`} exact component={FunctionalTestsEditor} />);
    //         tempRoutes.push(<Route path={requestedUrl + `functional_tests/editor/api`} exact component={FunctionalTestApiEditor} />);
    //       }
    //       if (permissions.edit_performance) {
    //         tempRoutes.push(<Route path={requestedUrl + `functional_tests/editor/:id/api`} exact component={FunctionalTestApiEditor} />);
    //         tempRoutes.push(<Route path={requestedUrl + `functional_tests/editor/:id`} component={FunctionalTestsEditor} />);
    //         tempRoutes.push(<Route path={requestedUrl + `functional_tests/summary/:id`} component={FunctionalTestSummary} />);
    //         tempRoutes.push(<Route path={requestedUrl + `functional_tests/overall-summary/:id`} component={FunctionalTestOverallSummary} />);
    //         tempRoutes.push(<Route path={requestedUrl + `perf-history/:id`} component={PerformanceRunHistory} />);
    //       }

    //       if (permissions.list_test) {
    //         tempRoutes.push(<Route path={requestedUrl + `tests`} component={ListTests} />)
    //       };
    //       if (permissions.create_test) {
    //         tempRoutes.push(<Route path={requestedUrl + `editor`} component={Editor} />);
    //       };
    //       if (permissions.edit_test) {
    //         tempRoutes.push(<Route path={requestedUrl + `test-editor/:id`} component={Editor} />);
    //       }
    //       if (permissions.list_test_history) {
    //         tempRoutes.push(<Route path={requestedUrl + `runs`} component={TestRuns} />);
    //         tempRoutes.push(<Route path={requestedUrl + `dropdown/:id`} component={DropAndDown} />);
    //         tempRoutes.push(<Route path={requestedUrl + `testruns/:id`} component={TestHistory} />);
    //       }

    //       if (permissions.run_test) {
    //         tempRoutes.push(<Route path={requestedUrl + `runs`} component={TestRuns} />);
    //       }

    //       if (permissions.list_group) {
    //         tempRoutes.push(<Route path={requestedUrl + `groups`} component={ListGroups} />)
    //       };

    //       if (permissions.list_schedule) {
    //         tempRoutes.push(<Route path={requestedUrl + `schedules`} component={Schedules} />);
    //       }
    //       if (permissions.test_run_detail) {
    //         tempRoutes.push(<Route path={requestedUrl + `rundetail/:id`} component={RunDetails} />);
    //       }

    //       tempRoutes.push(<Route path={requestedUrl + `settings`} component={Setting} />);
    //       tempRoutes.push(<Route path={requestedUrl + `trainee`} component={Trainee} />);
    //       tempRoutes.push(<Route path={requestedUrl + `traineeview/:id`} component={ViewImages} />);

    //       if (permissions.list_rule) {
    //         tempRoutes.push(<Route path={requestedUrl + `migration_rule`} component={MigrationRules} />);
    //         tempRoutes.push(<Route path={requestedUrl + `validation_rule`} component={ValidationRules} />);
    //         tempRoutes.push(<Route path={requestedUrl + `validationrule/add`} component={AddValidationList} />)
    //         tempRoutes.push(<Route path={requestedUrl + `rule/add`} component={migration_rule} />)
    //       }
    //       if (permissions.list_test) {
    //         tempRoutes.push(<Route path={requestedUrl + `trainer`} component={Trainings} />);
    //         tempRoutes.push(<Route path={requestedUrl + `trainerview/:id`} component={EditImages} />);


    //       }


    //       if (permissions.list_migration) {
    //         tempRoutes.push(<Route path={requestedUrl + `dms`} component={Migration_files} />);
    //         tempRoutes.push(<Route path={requestedUrl + `dm/add`} component={FileUploadDialog} />);
    //         tempRoutes.push(<Route path={requestedUrl + `mapping-history/:id`} component={Migration_History} />);
    //         tempRoutes.push(<Route path={requestedUrl + `migration-detail-history/:id`} component={Migration_Run_History} />);
    //         tempRoutes.push(<Route path={requestedUrl + `migration-detail-history-api/:id`} component={Misgration_Detail_History_Api} />);
    //         tempRoutes.push(<Route path={requestedUrl + `migration-detail-history-web/:id`} component={Misgration_Detail_History_Web} />);
    //         tempRoutes.push(<Route path={requestedUrl + `branches`} component={Branches} />);
    //         tempRoutes.push(<Route path={requestedUrl + `recorder_execution`} component={RecorderExecution} />);
    //         tempRoutes.push(<Route path={requestedUrl + `organization_branches`} component={OrganizationBranches} />);
    //       }


    //       if (permissions.list_member) {
    //         tempRoutes.push(<Route path={requestedUrl + `members`} component={Members} />);
    //         tempRoutes.push(<Route path={requestedUrl + `invitations`} component={Invitations} />);
    //       }

    //       if (permissions.list_policy) {

    //         tempRoutes.push(<Route path={requestedUrl + `data-migration`} component={DataMigration} />);
    //         tempRoutes.push(<Route path={requestedUrl + `policies`} component={Policies} />);
    //       }

    //       if (permissions.list_api) {
    //         tempRoutes.push(<Route path={requestedUrl + `apis`} component={ApisListAll} exact />);
    //         tempRoutes.push(<Route path={requestedUrl + `apirun/:id`} component={ApiHistory} />);
    //         tempRoutes.push(<Route path={requestedUrl + `apirundetail/:id`} component={ApiRunDetails} />);
    //       }

    //       if (permissions.create_api) {
    //         tempRoutes.push(<Route path={requestedUrl + `apis/add`} component={ApisAddNew} />);
    //       }
    //       // if (org && org.type === 1) {}
    //     }

    //   })


      setRoutes(tempRoutes);
    }, 1000);

  };

//   useEffect(() => {
//     getRoutes();
//   }, [orgs, org]);

  return (
    // <AppLayout>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          {routes}
          {/* <Route path={requestedUrl + `orgs`} component={ListOrgs} /> */}
          <Route component={lazy(() => import('./404'))} />
        </Switch>
      </Suspense>
    // </AppLayout>
  );
};

export default withRouter(Routes);