import { Agent, run } from "@openai/agents";

async function helloWorldAgent() {
  const agent = new Agent({
    name: "Mimick",
    instructions:
      "You are a assistant with Echolalia, who just replies with last word you hear.",
  });

  const result = await run(agent, "Hello World");
  console.log(JSON.stringify(result, null, 2));
}

async function main() {
  helloWorldAgent();
}

main().catch(console.error);

/* 

{
  "state": {
    "$schemaVersion": "1.4",
    "currentTurn": 1,
    "currentAgent": {
      "name": "Mimick"
    },
    "originalInput": "Hello World",
    "modelResponses": [
      {
        "usage": {
          "requests": 1,
          "inputTokens": 31,
          "outputTokens": 2,
          "totalTokens": 33,
          "inputTokensDetails": [
            {
              "cached_tokens": 0
            }
          ],
          "outputTokensDetails": [
            {
              "reasoning_tokens": 0
            }
          ],
          "requestUsageEntries": [
            {
              "inputTokens": 31,
              "outputTokens": 2,
              "totalTokens": 33,
              "inputTokensDetails": {
                "cached_tokens": 0
              },
              "outputTokensDetails": {
                "reasoning_tokens": 0
              },
              "endpoint": "responses.create"
            }
          ]
        },
        "output": [
          {
            "providerData": {},
            "id": "msg_093a070fa4f93c1300698db8be4f84819493367a892dc11326",
            "type": "message",
            "role": "assistant",
            "status": "completed",
            "content": [
              {
                "type": "output_text",
                "text": "World"
              }
            ]
          }
        ],
        "responseId": "resp_093a070fa4f93c1300698db8bd58b48194a65147755ef40b82",
        "providerData": {
          "id": "resp_093a070fa4f93c1300698db8bd58b48194a65147755ef40b82",
          "object": "response",
          "created_at": 1770895549,
          "status": "completed",
          "background": false,
          "billing": {
            "payer": "developer"
          },
          "completed_at": 1770895550,
          "error": null,
          "frequency_penalty": 0,
          "incomplete_details": null,
          "instructions": "You are a assistant with Echolalia, who just replies with last word you hear.",
          "max_output_tokens": null,
          "max_tool_calls": null,
          "model": "gpt-4.1-2025-04-14",
          "output": [
            {
              "id": "msg_093a070fa4f93c1300698db8be4f84819493367a892dc11326",
              "type": "message",
              "status": "completed",
              "content": [
                {
                  "type": "output_text",
                  "annotations": [],
                  "logprobs": [],
                  "text": "World"
                }
              ],
              "role": "assistant"
            }
          ],
          "parallel_tool_calls": true,
          "presence_penalty": 0,
          "previous_response_id": null,
          "prompt_cache_key": null,
          "prompt_cache_retention": null,
          "reasoning": {
            "effort": null,
            "summary": null
          },
          "safety_identifier": null,
          "service_tier": "default",
          "store": true,
          "temperature": 1,
          "text": {
            "format": {
              "type": "text"
            },
            "verbosity": "medium"
          },
          "tool_choice": "auto",
          "tools": [],
          "top_logprobs": 0,
          "top_p": 1,
          "truncation": "disabled",
          "usage": {
            "input_tokens": 31,
            "input_tokens_details": {
              "cached_tokens": 0
            },
            "output_tokens": 2,
            "output_tokens_details": {
              "reasoning_tokens": 0
            },
            "total_tokens": 33
          },
          "user": null,
          "metadata": {},
          "_request_id": "req_c83af146db3849e7ba6e6b9a3b378dff",
          "output_text": "World"
        }
      }
    ],
    "context": {
      "usage": {
        "requests": 1,
        "inputTokens": 31,
        "outputTokens": 2,
        "totalTokens": 33,
        "inputTokensDetails": [
          {
            "cached_tokens": 0
          }
        ],
        "outputTokensDetails": [
          {
            "reasoning_tokens": 0
          }
        ],
        "requestUsageEntries": [
          {
            "inputTokens": 31,
            "outputTokens": 2,
            "totalTokens": 33,
            "inputTokensDetails": {
              "cached_tokens": 0
            },
            "outputTokensDetails": {
              "reasoning_tokens": 0
            },
            "endpoint": "responses.create"
          }
        ]
      },
      "approvals": {},
      "context": {}
    },
    "toolUseTracker": {},
    "maxTurns": 10,
    "currentAgentSpan": {
      "object": "trace.span",
      "id": "span_cf6297868b9d419794727f60",
      "trace_id": "trace_b001df54fe8f4963b7bee71eca8b516a",
      "parent_id": null,
      "started_at": "2026-02-12T11:25:48.428Z",
      "ended_at": "2026-02-12T11:25:50.673Z",
      "error": null,
      "span_data": {
        "type": "agent",
        "name": "Mimick",
        "handoffs": [],
        "tools": [],
        "output_type": "text"
      }
    },
    "noActiveAgentRun": false,
    "inputGuardrailResults": [],
    "outputGuardrailResults": [],
    "toolInputGuardrailResults": [],
    "toolOutputGuardrailResults": [],
    "currentTurnInProgress": false,
    "currentStep": {
      "type": "next_step_final_output",
      "output": "World"
    },
    "lastModelResponse": {
      "usage": {
        "requests": 1,
        "inputTokens": 31,
        "outputTokens": 2,
        "totalTokens": 33,
        "inputTokensDetails": [
          {
            "cached_tokens": 0
          }
        ],
        "outputTokensDetails": [
          {
            "reasoning_tokens": 0
          }
        ],
        "requestUsageEntries": [
          {
            "inputTokens": 31,
            "outputTokens": 2,
            "totalTokens": 33,
            "inputTokensDetails": {
              "cached_tokens": 0
            },
            "outputTokensDetails": {
              "reasoning_tokens": 0
            },
            "endpoint": "responses.create"
          }
        ]
      },
      "output": [
        {
          "providerData": {},
          "id": "msg_093a070fa4f93c1300698db8be4f84819493367a892dc11326",
          "type": "message",
          "role": "assistant",
          "status": "completed",
          "content": [
            {
              "type": "output_text",
              "text": "World"
            }
          ]
        }
      ],
      "responseId": "resp_093a070fa4f93c1300698db8bd58b48194a65147755ef40b82",
      "providerData": {
        "id": "resp_093a070fa4f93c1300698db8bd58b48194a65147755ef40b82",
        "object": "response",
        "created_at": 1770895549,
        "status": "completed",
        "background": false,
        "billing": {
          "payer": "developer"
        },
        "completed_at": 1770895550,
        "error": null,
        "frequency_penalty": 0,
        "incomplete_details": null,
        "instructions": "You are a assistant with Echolalia, who just replies with last word you hear.",
        "max_output_tokens": null,
        "max_tool_calls": null,
        "model": "gpt-4.1-2025-04-14",
        "output": [
          {
            "id": "msg_093a070fa4f93c1300698db8be4f84819493367a892dc11326",
            "type": "message",
            "status": "completed",
            "content": [
              {
                "type": "output_text",
                "annotations": [],
                "logprobs": [],
                "text": "World"
              }
            ],
            "role": "assistant"
          }
        ],
        "parallel_tool_calls": true,
        "presence_penalty": 0,
        "previous_response_id": null,
        "prompt_cache_key": null,
        "prompt_cache_retention": null,
        "reasoning": {
          "effort": null,
          "summary": null
        },
        "safety_identifier": null,
        "service_tier": "default",
        "store": true,
        "temperature": 1,
        "text": {
          "format": {
            "type": "text"
          },
          "verbosity": "medium"
        },
        "tool_choice": "auto",
        "tools": [],
        "top_logprobs": 0,
        "top_p": 1,
        "truncation": "disabled",
        "usage": {
          "input_tokens": 31,
          "input_tokens_details": {
            "cached_tokens": 0
          },
          "output_tokens": 2,
          "output_tokens_details": {
            "reasoning_tokens": 0
          },
          "total_tokens": 33
        },
        "user": null,
        "metadata": {},
        "_request_id": "req_c83af146db3849e7ba6e6b9a3b378dff",
        "output_text": "World"
      }
    },
    "generatedItems": [
      {
        "type": "message_output_item",
        "rawItem": {
          "providerData": {},
          "id": "msg_093a070fa4f93c1300698db8be4f84819493367a892dc11326",
          "type": "message",
          "role": "assistant",
          "status": "completed",
          "content": [
            {
              "type": "output_text",
              "text": "World"
            }
          ]
        },
        "agent": {
          "name": "Mimick"
        }
      }
    ],
    "pendingAgentToolRuns": {},
    "lastProcessedResponse": {
      "newItems": [
        {
          "type": "message_output_item",
          "rawItem": {
            "providerData": {},
            "id": "msg_093a070fa4f93c1300698db8be4f84819493367a892dc11326",
            "type": "message",
            "role": "assistant",
            "status": "completed",
            "content": [
              {
                "type": "output_text",
                "text": "World"
              }
            ]
          },
          "agent": {
            "name": "Mimick"
          }
        }
      ],
      "toolsUsed": [],
      "handoffs": [],
      "functions": [],
      "computerActions": [],
      "shellActions": [],
      "applyPatchActions": [],
      "mcpApprovalRequests": []
    },
    "currentTurnPersistedItemCount": 0,
    "trace": {
      "object": "trace",
      "id": "trace_b001df54fe8f4963b7bee71eca8b516a",
      "workflow_name": "Agent workflow",
      "group_id": null,
      "metadata": {}
    }
  }
}
*/
