/**
 * -
 *
 * -
 *
 * @author potanin
 * @date 6/6/13
 */

var AWS = new require( 'aws-sdk' ); // SDK

// Service Constructor, performed once
var SWF = new AWS.SimpleWorkflow({
  "accessKeyId": "",
  "secret": "",
  "region": ""
});

// Create AWS.SimpleWorkflow Abstraction
var Workflow = Abstract.Create({
  "Define": {
    "description": "Configure a Workflow Schema with conditional routing steps for processing complex long term tasks.",
    "parameters": {
      "name":          { "method": "RegisterWorkflowType", "path": "name", "format": "String" },
      "version":       { "method": "RegisterWorkflowType", "path": "version", "format": "string" },
      "description":   { "method": "RegisterWorkflowType", "path": "description" },
      "channel":       { "method": "RegisterWorkflowType", "path": "defaultTaskList.name" },
      "execution.ttl": { "method": "RegisterWorkflowType", "path": "defaultExecutionStartToCloseTimeout" },
      "task.ttl":      { "method": "RegisterWorkflowType", "path": "defaultTaskStartToCloseTimeout" },
      "domain":        { "method": "RegisterWorkflowType", "path": "domain" },
      "policy":        { "method": "RegisterWorkflowType", "path": "defaultChildPolicy" },
      "tasks":         { "method": "LocalMemoryStore", "path": "schema" },
      "states":        { "method": "LocalMemoryStore", "path": "states" }
    }
  },
  "Worker": {
    "description": "Defines a worker that will essentially do what a Decider tellthem to.",
    "parameters": {
      "domain":         { "method": "registerActivityType", "path": "domain" },
      "name":           { "method": "registerActivityType", "path": "name" },
      "version":        { "method": "registerActivityType", "path": "version.name" },
      "channel":        { "method": "registerActivityType", "path": "defaultTaskList.name" },
      "description":    { "method": "registerActivityType", "path": "description" },
      "stc.ttl":        { "method": "registerActivityType", "path": "defaultTaskStartToCloseTimeout" },
      "hb.ttl":         { "method": "registerActivityType", "path": "defaultTaskHeartbeatTimeout" },
      "sts.ttl":        { "method": "registerActivityType", "path": "defaultTaskScheduleToStartTimeout" },
      "scc.ttl":        { "method": "registerActivityType", "path": "defaultTaskScheduleToCloseTimeout" }
    },
    "callback": {
      "success": "",
      "error": ""
    }
  },
  "Process": {
    "description": "Begin processing a defined Workflow",
    "parameters": {
      "id":            { "method": "StartWorkflowExecution", "path": "childPolicy" },
      "channel":       { "method": "StartWorkflowExecution", "path": "taskList.name" },
      "name":          { "method": "StartWorkflowExecution", "path": "workflowType.name" },
      "version":       { "method": "StartWorkflowExecution", "path": "workflowType.version" },
      "policy":        { "method": "StartWorkflowExecution", "path": "childPolicy" },
      "domain":        { "method": "StartWorkflowExecution", "path": "domain" },
      "input":         { "method": "StartWorkflowExecution", "path": "input", "format": "String" },
      "ttl":           { "method": "StartWorkflowExecution", "path": "taskStartToCloseTimeout" },
      "tags":          { "method": "StartWorkflowExecution", "path": "tagList", "format": "Array" }
    },
    "callback": {
      "success": "",
      "error": ""
    }
  }
});

// Defines a process and the steps necessary to perform them.
Workflow.Define({
  "name": "System.Initialization",
  "description": "Performed during application start-up. The environment and state of cluster determines which services to load..",
  "version": 1.0,
  "tasks": {

  }}
);

Workflow.Define({ "name": "ChickenFarmHandling", "version": 1.0, "schema": { /*...*/ } });

// Workers provide the services needed to process a Workflow Schema.
Workflow.Worker({ "name": "ChickenFeeder", "version": 1.0, "worker": function() { /** The actual work gets done here */  } });
Workflow.Worker({ "name": "ChickenFeeder", "version": 1.1, "worker": function() { /** The actual work gets done here */  } });
Workflow.Worker({ "name": "ChickenSexer", "version": 1.0, "worker": function() { /** The actual work gets done here */  }  });
Workflow.Worker({ "name": "ChickenWorker", "version": 1.0, "worker": function() { /** The actual work gets done here */  }  });

Workflow.Process({ 'id': 'fight', 'channel': 'asdfds', 'name': 'adsf', 'version': '33', 'data': [ 'ducks' ] }); // @SignalWorkflowExecution

Workflow.message({ 'signalName': 'fight', 'workflowId': 'FeedChickens', 'input': {} }); // @SignalWorkflowExecution

