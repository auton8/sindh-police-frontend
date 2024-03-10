import React from 'react';
import { ListAlt, Schedule, Speed, GroupWorkSharp, Apartment, BarChart, Settings, Policy, NetworkCheck } from '@material-ui/icons';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import PersonIcon from '@material-ui/icons/Person';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RuleIcon from '@mui/icons-material/Rule';
import TransformIcon from '@mui/icons-material/Transform';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';

const defaultRoute = '/app/';

export const getMenuFull = (permissions, orgs) => {
  let subMenu = []
  let trainingSubMenu=[
    {
      name: 'Trainer',
      type: 'item',
      icon: <Settings />,
      link: `${defaultRoute}trainer`,
    },
    {
      name: 'Trainee',
      type: 'item',
      icon: <Settings />,
      link: `${defaultRoute}trainee`,
    }
    ]

  if (permissions.list_rule) {
    subMenu.push({
      name: 'Transformation Rules',
      type: 'item',
      // icon: <RuleIcon />,
      link: `${defaultRoute}migration_rule`,
    },)
   
  }
  
  if (permissions.list_rule) {
    subMenu.push({
      name: 'Validation Rules',
      type: 'item',
      // icon: <RuleIcon />,
      link: `${defaultRoute}validation_rule`,
    },)
   
  }

  if (permissions.list_migration) {
    subMenu.push({
      name: 'Migrations',
      type: 'item',
      icon: <TransformIcon />,
      link: `${defaultRoute}dms`,
    }
    )
  }

  let children = [
    {
      name: 'Insight',
      type: 'item',
      icon: <BarChart />,
      link: `${defaultRoute}dashboard`,
    },
    {
      name: 'Projects',
      type: 'item',
      icon: <Apartment />,
      link: `${defaultRoute}orgs`,
    },
  ];

  if (permissions.list_group) {
    children.push({
      name: 'Scenarios',
      icon: <GroupWorkSharp />,
      type: 'item',
      link: `${defaultRoute}groups`,
    });
  }
  if (permissions.list_migration) {
    children.push({
      name: 'Branches',
      type: 'item',
      icon: <Apartment />,
      link: `${defaultRoute}branches`,
    }
    )
  }
  if (permissions.list_migration) {
    children.push({
      name: 'Organization Branches',
      type: 'item',
      icon: <Apartment />,
      link: `${defaultRoute}organization_branches`,
    }
    )
  }
  if (permissions.list_migration) {
    children.push({
      name: 'Recorder Execution',
      type: 'item',
      icon: <Apartment />,
      link: `${defaultRoute}recorder_execution`,
    }
    )
  }
  if (permissions.list_test) {
    children.push({
      name: 'Web Tests',
      icon: <ListAlt />,
      type: 'item',
      link: `${defaultRoute}tests`,
    });
  }

  if (permissions.list_api) {
    children.push({
      name: 'Api Tests',
      type: 'item',
      icon: <NetworkCheck />,
      link: `${defaultRoute}apis`,
    });
  }

  if (permissions.list_performance) {
    children.push({
      name: 'Performance Test',
      icon: <PublishedWithChangesIcon style={{ fontSize: "20px" }} />,
      type: 'item',
      link: `${defaultRoute}functional_tests`,
    });
  }

  if (permissions.list_performance) {
    children.push({
      name: 'Performance Beta',
      icon: <PublishedWithChangesIcon style={{ fontSize: '20px' }} />,
      type: 'item',
      link: `${defaultRoute}performance_tests`,
    });
  }

  if (permissions.list_schedule) {
    children.push({
      name: 'Schedules',
      icon: <Schedule />,
      type: 'item',
      link: `${defaultRoute}schedules`,
    });
  }


  if (permissions.run_test) {
    children.push({
      name: 'Runs',
      icon: <Speed />,
      type: 'item',
      link: `${defaultRoute}runs`,
    });
  }

  if (permissions.list_member) {
    children.push({
      name: 'Members',
      type: 'item',
      icon: <PersonIcon />,
      link: `${defaultRoute}members`,
    });
  }

  if (permissions.list_policy) {
    children.push({
      name: 'Policies',
      type: 'item',
      icon: <Policy />,
      link: `${defaultRoute}policies`,
    });
  }

  if (permissions.list_migration || permissions.list_rule)
    children.push({
      name: 'Data Tool',
      type: 'collapse',
      icon: <UploadFileIcon />,
      children: subMenu
    });

    children.push({
      name: 'Training',
      type: 'collapse',
      icon: <ModelTrainingIcon />,
      children: trainingSubMenu
    })

  children.push({
    name: 'Settings',
    type: 'item',
    icon: <Settings />,
    link: `${defaultRoute}settings`,
  });

  return [{
    name: '',
    type: 'section',
    children: Array.isArray(orgs) && orgs.length > 0 ? children : [children[1]]
  }];

}

export const getMenuLess = () => [
  {
    name: 'Projects',
    type: 'item',
    icon: <Apartment />,
    link: `${defaultRoute}orgs`,
  },
];
