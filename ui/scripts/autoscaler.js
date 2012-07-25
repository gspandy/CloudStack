// Copyright 2012 Citrix Systems, Inc. Licensed under the
// Apache License, Version 2.0 (the "License"); you may not use this
// file except in compliance with the License.  Citrix Systems, Inc.
// reserves all rights not expressly granted by the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Automatically generated by addcopyright.py at 04/03/2012
(function($,cloudstack) {
  var scaleUpData = [];
  var totalScaleUpCondition = 0;
  var scaleDownData = [];
  var totalScaleDownCondition = 0;
  cloudStack.autoscaler = {
    // --
    // Add the following object blocks:
    //
    // topFields: { <standard createForm field format> }
    // bottomFields: { <standard createForm field format> },
    // scaleUpPolicy: { <standard multiEdit field format> },
    // scaleDownPolicy: { <standard multiEdit field format> }
    // --
    //
    forms: {
      topFields: {
        templateCategory: {
          label: 'Template',
          id: 'templatecategory',
          select: function(args) {
            args.response.success({
              data: [
                { id: 'all', description: _l('ui.listView.filters.all') },
                { id: 'featured', description: _l('label.featured') },
                { id: 'Community', description: _l('label.menu.community.templates') },
                { id: 'self', description: _l('ui.listView.filters.mine') }
              ]
            });
          }
        },

        templateNames: {
          label: '',
          id: 'templatename',
          select: function(args) {
            $.ajax({
              url: createURL("listTemplates&templatefilter=all" ),
              dataType: "json",
              async: true,
              success: function(json) {
                var templates = json.listtemplatesresponse.template;
                args.response.success({
                  data: $.map(templates, function(template) {
                    return {
                      id: template.id,
                      description: template.name
                    };
                  })
                });
              }
            });
          }
        },

        serviceOfferingId: {
          label: 'label.compute.offering',
          select: function(args) {
            $.ajax({
              url: createURL("listServiceOfferings&issystem=false"),
              dataType: "json",
              async: true,
              success: function(json) {
                var serviceofferings = json.listserviceofferingsresponse.serviceoffering;
                args.response.success({
                  data: $.map(serviceofferings, function(serviceoffering) {
                    return {
                      id: serviceoffering.id,
                      description: serviceoffering.name
                    };
                  })
                });
              }
            });
          }
        },

        minInstance: {
          label: 'Min Instances',
          defaultValue: '3',
          validation: { required: true }
        },

        maxInstance: {
          label: 'Max Instances',
          defaultValue: '10',
          validation: { required: true }
        }
      },

      bottomFields: {
    	  	isAdvanced: { isBoolean: true, label: 'Show advanced settings' },
          interval: {
              label: 'Polling Interval (in sec)',
              defaultValue: '30',
              validation: { required: true }
          },

          quietTime: {
          	label: 'Quiet Time (in sec)',
          	defaultValue: '300',
          	validation: { required: true }
          },

          destroyVMgracePeriod: {
          	label: 'Destroy VM Grace Period',
          	defaultValue: '30',
              isHidden:true,
              dependsOn:'isAdvanced',
          	validation: { required: true }
          },
	        securityGroups: {
	          label: 'label.menu.security.groups',
	          isHidden: true,
	          dependsOn: 'isAdvanced',
	          select: function(args) {
	            $.ajax({
	              url: createURL("listSecurityGroups&listAll=true"),
	              dataType: "json",
	              async: true,
	              success: function(json) {
	                var securitygroups = json.listsecuritygroupsresponse.securitygroup;
	                var items = [];
                    items.push({id: "", description: ""});
                    $(securitygroups).each(function(){
                    items.push({id: this.id, description: this.name});
                    });
                  args.response.success({ data: items });
	              }
	            });
	          }
	        },

	        DiskOfferings: {
	          label: 'label.menu.disk.offerings',
	          isHidden: true,
	          dependsOn: 'isAdvanced',
	          select: function(args) {
	            $.ajax({
	              url: createURL("listDiskOfferings&listAll=true"),
	              dataType: "json",
	              async: true,
	              success: function(json) {
	                var diskofferings = json.listdiskofferingsresponse.diskoffering;
                  var items = [];
                    items.push({id: "", description: ""});
                    $(diskofferings).each(function(){
                    items.push({id: this.id, description: this.name});
                    });
	                args.response.success({ data: items });
	              }
	            });
	          }
	        },
	
	        snmpCommunity: {
	        	isHidden: true,
	        	dependsOn: 'isAdvanced',
	          label: 'SNMP Community',
	          defaultValue: 'public',
	          validation: { required: true }
	        },
	
	        snmpPort: {
	        	isHidden: true,
	        	dependsOn: 'isAdvanced',
	          label: 'SNMP Port',
	          defaultValue: '161',
	          validation: { required: true }
	        },
	
	        username: {
	        	isHidden: true,
	        	dependsOn: 'isAdvanced',
	          label: 'Username',
	          select: function(args) {
	            $.ajax({
	              url: createURL("listUsers&domainid=" + args.context.users[0].domainid),
	              dataType: "json",
	              async: true,
	              success: function(json) {
		            	var users = json.listusersresponse.user;
                  var items = [];
                    items.push({id: "", description: ""});
                    $(users).each(function(){
                    items.push({id: this.id, description: this.username});
                    });
		            	args.response.success({ data:  items });
	              }
	            });
	          }
	        }
	      },
      scaleUpPolicy: {
        title: 'ScaleUp Policy',
        label: 'SCALE UP POLICY',
        noSelect: true,
        noHeaderActionsColumn: true,
        fields: {
          'counterid': { 
	    	    label: 'Counter',
    	      select: function(args) {
              $.ajax({
                url: createURL("listCounters"),
                dataType: "json",
                async: true,
                success: function(json) {
                  var counters = json.counterresponse.counter;
                  
                  args.response.success({
                    data: $.map(counters, function(counter) {
                      return {
                        name: counter.id,
                        description: counter.name
                      };
                    })
                  });
                }
              });
            }	
		      },
          'relationaloperator': {
            label: 'Operator',
            select: function(args) {
              args.response.success({
                data: [
                  { name: 'GT', description: 'greater-than' },
                  { name: 'GE', description: 'greater-than or equals to' },
                  { name: 'LT', description: 'less-than' },
                  { name: 'LE', description: 'less-than or equals to' },
                  { name: 'EQ', description: 'equals-to' }
                ]
              });
            }
          },
          'threshold': { edit: true, label: 'Threshold'},
          'add-scaleUpcondition': {
            label: 'label.add',
            addButton: true
          }
        },  
	 add: {
            label: 'label.add',
            action: function(args) {
              scaleUpData.push($.extend(args.data, {
                index: totalScaleUpCondition
              }));

              totalScaleUpCondition++;
              args.response.success();
            }
          },
          actions: {
            destroy: {
              label: '',
              action: function(args) {
                scaleUpData = $.grep(scaleUpData, function(item) {
                  return item.index != args.context.multiRule[0].index;
                });
                totalScaleUpCondition--;
                args.response.success();
              }
            }
          },
          ignoreEmptyFields: true,
          dataProvider: function(args) {
            args.response.success({
              data: scaleUpData
            });
          }
        /*actions: {
          destroy: {
        	label: '',
            action: function(args) {
              $.ajax({
                url: createURL("deleteCondition&id=" + args.context.multiRule[0].counterid),
                dataType: 'json',
                async: true,
                success: function(data) {
                  var jobId = data.deleteconditionresponse.jobid;
                  
                  args.response.success({
                    _custom: {
                      jobId: jobId
                    }
                  });
                }
            	});
            }
          }
        },
        ignoreEmptyFields: true,
        dataProvider: function(args) {
        	$.ajax({
            url: createURL('listConditions'),
            dataType: 'json',
            async: true,
            success: function(data) {
        			args.response.success({
                data: $.map(
                  data.listconditionsresponse.condition ?
                    data.listconditionsresponse.condition : [],
                  function(elem) {
                    return {
                  	counterid: elem.id,
                      relationaloperator: elem.relationaloperator,
                      threshold: elem.threshold
                    };
                  }
                )
        			});
            }
        	});
        }*/
      },

      scaleDownPolicy: {
        title: 'ScaleDown Policy',
        noSelect: true,
        noHeaderActionsColumn: true,
        fields: {
	      	'counterid': {
		    	  label: 'Counter',
            select: function(args) {
	            $.ajax({
	              url: createURL("listCounters"),
	              dataType: "json",
	              async: true,
	              success: function(json) {
	                var counters = json.counterresponse.counter;
	              
	                args.response.success({
                    data: $.map(counters, function(counter) {
	                    return {
		                    name: counter.id,
		                    description: counter.name
		                  };
	                  })
	                });
	              }
	            });
	      		}
    			},
          'relationaloperator': {
            label: 'Operator',
            select: function(args) {
              args.response.success({
                data: [
                  { name: 'GT', description: 'greater-than' },
                  { name: 'GE', description: 'greater-than or equals to' },
                  { name: 'LT', description: 'less-than' },
                  { name: 'LE', description: 'less-than or equals to' },
                  { name: 'EQ', description: 'equals-to' }
                ]
              });
            }
          },
          'threshold': { edit: true, label: 'Threshold'},
          'add-scaleDowncondition': {
            label: 'label.add',
            addButton: true
          }
        },
        add: {
        	label: 'label.add',
        	action: function(args) {
        		scaleDownData.push($.extend(args.data, {
        			index: totalScaleDownCondition
        		}));
        		totalScaleDownCondition++;
        		args.response.success();
        	}
        },
        actions: {
        	destroy: {
        		label: '',
        		action: function(args) {
        			scaleDownData = $.grep(scaleDownData, function(item) {
        				return item.index != args.context.multiRule[0].index;
        			});
                                totalScaleDownCondition--;
        			args.response.success();
        		}
        	}
        },
        ignoreEmptyFields: true,
        dataProvider: function(args) {
        	args.response.success({
        		data: scaleDownData
        	});
        }
	/*
        actions: {
          destroy: {
            label: '',
            action: function(args) {
        			$.ajax({
                url: createURL("deleteCondition&id=" + args.context.multiRule[0].counterid),
                dataType: 'json',
                async: true,
                success: function(data) {
                  var jobId = data.deleteconditionresponse.jobid;

                  args.response.success({
                    _custom: {
                      jobId: jobId
                    }
                  });
                }
            	});
            }
          }
        },
        ignoreEmptyFields: true,
        dataProvider: function(args) {
        	$.ajax({
            url: createURL('listConditions'),
            dataType: 'json',
            async: true,
            success: function(data) {
        			args.response.success({
                data: $.map(
                  data.listconditionsresponse.condition ?
                    data.listconditionsresponse.condition : [],
                  function(elem) {
                    return {
	                  	counterid: elem.id,
	                    relationaloperator: elem.relationaloperator,
	                    threshold: elem.threshold
                    };
                  }
                )
              });
            }
        	});
        }*/
      }
    },

    actions: {
    	add: function(args) {
        var scaleUpPolicyResponse = [];
        var scaleDownPolicyResponse = [];
        var scaleVmProfileResponse = [];
        var loadBalancerResponse  = [];
        var scaleVmGroupResponse = [];
        var scaleUpConditionIds = []; 
        var scaleDownConditionIds = [];
        
      var scaleUpCondition = function(args){
        $.map(scaleUpData, function(elem) {
        	var array1 = [];
        	array1.push("&counterid=" + elem.counterid);
        	array1.push("&relationaloperator=" + elem.relationaloperator);
        	array1.push("&threshold=" + elem.threshold);
        	array1.push("&account=" + args.context.users[0].account);
        	array1.push("&domainid=" +args.context.users[0].domainid );
        	
        	$.ajax({
        		url: createURL("createCondition" + array1.join("")),
        		dataType: 'json',
        		async: true,
        		success: function(data) {
        			scaleUpConditionIds.push(data.conditionresponse.id);
                                if (scaleUpConditionIds.length == totalScaleUpCondition)
                                            scaleDownCondition(args);
        			//scaleUpConditionIds = scaleUpConditionIds? scaleUpConditionIds.concat(",").concat(data.conditionresponse.id): data.conditionresponse.id;	
        		}
        	});
        });       
      };
      
      var scaleDownCondition = function(args){
        $.map(scaleDownData, function(elem) {
        	var array1 = [];
        	array1.push("&counterid=" + elem.counterid);
        	array1.push("&relationaloperator=" + elem.relationaloperator);
        	array1.push("&threshold=" + elem.threshold);
        	array1.push("&account=" + args.context.users[0].account);
        	array1.push("&domainid=" +args.context.users[0].domainid );
        	
        	$.ajax({
        		url: createURL("createCondition" + array1.join("")),
        		dataType: 'json',
        		async: true,
        		success: function(data) {
	        		scaleDownConditionIds.push(data.conditionresponse.id);
                                if (scaleDownConditionIds.length == totalScaleDownCondition)
                                      scaleUp(args);
	        		//scaleDownConditionIds = scaleDownConditionIds? scaleDownConditionIds.concat(",").concat(data.conditionresponse.id): data.conditionresponse.id;	
        		}
        	});
        });
      };
        
      var scaleUp = function(args){  
        var array1 = [];
        array1.push("&action=" + "scaleup");
        array1.push("&conditionids=" + scaleUpConditionIds.join(","));
        array1.push("&duration=" + args.data.scaleUpDuration );
        array1.push("&quiettime=" + args.data.quietTime);
        
        $.ajax({
          url: createURL('createAutoScalePolicy' + array1.join("")),
          dataType: 'json',
          async: true,
          success: function(data) {
            var jobId = data.autoscalepolicyresponse.jobid;
            var autoScalePolicyTimer = setInterval(function(){
              $.ajax({
                url: createURL("queryAsyncJobResult&jobId="+jobId),
                dataType: "json",
                success: function(json) {
	                var result = json.queryasyncjobresultresponse;
	                if (result.jobstatus == 0) {
	                    return; //Job has not completed
	                }
	                else {                                                      
		                    clearInterval(autoScalePolicyTimer); 
		                    if (result.jobstatus == 1) { //AutoScalePolicy successfully created
		                        scaleUpPolicyResponse = result.jobresult.autoscalepolicy;
		                        scaleDown(args);
	                    }
	                    else if (result.jobstatus == 2) {
	                    	alert("failed to create autoScaleUpPolicy." + _s(result.jobresult.errortext));
	                    }
	                }
                },
                error: function(args) {
                  clearInterval(autoScalePolicyTimer);
                }
              });    
          });
          }
        });
      }; 
      var scaleDown = function(args){
        var array1 = [];
        array1.push("&action=" + "scaledown");
        array1.push("&conditionids=" + scaleDownConditionIds.join(","));
        array1.push("&duration=" + args.data.scaleDownDuration );
        array1.push("&quiettime=" + args.data.quietTime);
        
        $.ajax({
        	url: createURL('createAutoScalePolicy' + array1.join("")),
        	dataType: 'json',
        	async: true,
        	success: function(data) {
	        	var jobId = data.autoscalepolicyresponse.jobid;
	        	var autoScalePolicyTimer = setInterval(function(){
	        		$.ajax({
	        			url: createURL("queryAsyncJobResult&jobId="+jobId),
	        			dataType: "json",
	        			success: function(json) {
		        			var result = json.queryasyncjobresultresponse;
		        			if (result.jobstatus == 0) {
		        				return; //Job has not completed
		        			}
		        			else {                                                      
		        				clearInterval(autoScalePolicyTimer); 
		        				if (result.jobstatus == 1) { //AutoScalePolicy successfully created
		        					scaleDownPolicyResponse = result.jobresult.autoscalepolicy;
		        					createVmProfile(args);
		        				}
		        				else if (result.jobstatus == 2) {
		        					alert("failed to create autoScaleDownPolicy." + _s(result.jobresult.errortext));
		        				}
		        			}
	        			},
		        		error: function(args) {
		        			clearInterval(autoScalePolicyTimer);		        			
		        		}
	        		});    
	        	});
        	}
        });
      };
        
      var createVmProfile = function(args){
        var array1 = [];
        array1.push("&zoneid=" + args.context.networks[0].zoneid);
        array1.push("&templateid=" + args.data.templateNames);
        array1.push("&serviceofferingid=" + args.data.serviceOfferingId);
        array1.push("&snmpcommunity=" + args.data.snmpCommunity);
        array1.push("&snmpport=" + args.data.snmpPort);
        array1.push("&destroyvmgraceperiod=" + args.data.destroyVMgracePeriod);
        
        if(args.data.username[1] != "")
            array1.push("&autoscaleuserid=" + args.data.username[1]);
    
        var array2 = [];
        if(args.data.diskOfferings != "")
            array2.push("diskofferingid=" + args.data.diskOfferings);
        if(args.data.securityGroups != ""){
          if(array2.join("") != "")
            array2.push("&securitygroupids=" + args.data.securityGroups);
          else
            array2.push("securitygroupids=" + args.data.securityGroups);
        }
        array2 = array2.join("");
        if(array2 != "")
            array1.push("&otherdeployparams=" + encodeURIComponent(array2));

        $.ajax({
        	url: createURL('createAutoScaleVmProfile' + array1.join("")),
        	dataType: 'json',
        	async: true,
        	success: function(data) {
	        	var jobId = data.autoscalevmprofileresponse.jobid;
	        	var autoscaleVmProfileTimer = setInterval(function(){
	        		$.ajax({
	        			url: createURL("queryAsyncJobResult&jobId="+jobId),
	        			dataType: "json",
	        			success: function(json) {
		        			var result = json.queryasyncjobresultresponse;
		        			if (result.jobstatus == 0) {
		        				return; //Job has not completed
		        			}
		        			else {                                                      
		        				clearInterval(autoscaleVmProfileTimer); 
		        				if (result.jobstatus == 1) { //VM Profile successfully created
		        					scaleVmProfileResponse = result.jobresult.autoscalevmprofile;
		        					loadBalancer(args);
		        				}
		        				else if (result.jobstatus == 2) {
		        					alert("failed to create autoscaleVM Profile." + _s(result.jobresult.errortext));
		        				}
		        			}
	        			},
		        		error: function(args) {
		        			clearInterval(autoscaleVmProfileTimer);
		        		}
	        		});
	        	});
        	}
        });
      };
      
      var loadBalancer = function(args){
        var array1 = [];
        array1.push("&algorithm=" + args.data.algorithm);
        array1.push("&name=" + args.data.name);
        array1.push("&privateport=" + args.data.privateport );
        array1.push("&publicport=" + args.data.publicport);
        array1.push("&account=" + args.context.users[0].account);
        array1.push("&domainid=" + args.context.users[0].domainid);
        array1.push("&zoneid=" + args.context.networks[0].zoneid );

        $.ajax({
        	url: createURL('createLoadBalancerRule' + array1.join("")),
        	dataType: 'json',
        	async: true,
        	success: function(json) {
        		var jobId = json.createloadbalancerruleresponse.jobid;
        		var loadBalancerTimer = setInterval(function(){
        			$.ajax({
        				url: createURL("queryAsyncJobResult&jobId="+jobId),
        				dataType: "json",
        				success: function(json) {
	        				var result = json.queryasyncjobresultresponse;
	        				if (result.jobstatus == 0) {
	        					return; //Job has not completed
	        				}
	        				else {                                                      
	        					clearInterval(loadBalancerTimer); 
	        					if (result.jobstatus == 1) { //LoadBalancerRule successfully created
	        						loadBalancerResponse = result.jobresult.loadbalancer;
	        						autoScaleVmGroup(args);
	        					}
	        					else if (result.jobstatus == 2) {
	        						alert("failed to createloadBalancerRule" + _s(result.jobresult.errortext));
	        					}
	        				}
        				},
	        			error: function(args) {
	        				clearInterval(loadBalancerTimer);	        			}
        			});        
        		});
          }
        });
      };
                  
      var autoScaleVmGroup = function(args){
      	var array1 = [];
      	array1.push("&lbruleid=" + loadBalancerResponse.id);
      	array1.push("&minMembers=" + args.data.minInstance);
      	array1.push("&maxMembers=" + args.data.maxInstance );
      	array1.push("&vmprofileid=" + scaleVmProfileResponse.id);
      	array1.push("&interval=" + args.data.interval);
      	array1.push("&scaleuppolicyids=" + scaleUpPolicyResponse.id);
      	array1.push("&scaledownpolicyids=" + scaleDownPolicyResponse.id );
      	$.ajax({
      		url: createURL('createAutoScaleVmGroup' + array1.join("")),
      		dataType: 'json',
      		async: true,
      		success: function(json) {
	      		var jobId = json.autoscalevmgroupresponse.jobid;
	      		var scaleVmGroupTimer = setInterval(function(){
	      			$.ajax({
	      				url: createURL("queryAsyncJobResult&jobId="+jobId),
	      				dataType: "json",
	      				success: function(json) {
		      				var result = json.queryasyncjobresultresponse;
		      				if (result.jobstatus == 0) {
		      					return; //Job has not completed
		      				}
		      				else {                                                      
		      					clearInterval(scaleVmGroupTimer); 
		      					
		      					if (result.jobstatus == 1) { //autoscale Vm group successfully created
		      						scaleVmGroupResponse = result.jobresult.autoscalevmgroup;
		      					}
		      					else if (result.jobstatus == 2) {
		      						alert("failed to create autoScaleVmGroup" + _s(result.jobresult.errortext));
		      					}
		      				}
		      			},
		      			error: function(args) {
		      				clearInterval(scaleVmGroupTimer);
		      			}
	      			});        
	      		});
      		}
      	});
      };
     scaleUpCondition(args); 
    },
    destroy: function(args) {
    	$.ajax({
    		url: createURL('')
    	});
    }
   },

    dialog: function(args) {
      return function(args) {
        var context = args.context;

        var $dialog= $('<div>');
        $dialog.dialog ({
          title: 'AutoScale Configuration Wizard',
          closeonEscape: false,

          draggable:true,
          width:  825 ,
          height :600,
          buttons: {
            'Cancel': function() {
              $(this).dialog("close");
              $('.overlay').remove();
            },


            'Apply': function() {
              $(':ui-dialog').remove();
              $('.overlay').remove();
            }
          }
        }).closest('.ui-dialog').overlay();

        $("buttons").each(function() {
          $(this).attr('style','float: right');
        });
        var $field = $('<div>').addClass('field username');
        var $input = $('<input>').attr({ name: 'username' });
        var $inputLabel = $('<label>').html('Username');

        $field.append($input, $inputLabel);
        $field.appendTo($dialog);


      }
    }
  }
} (jQuery,cloudStack));
