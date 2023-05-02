fields @timestamp, @message
| filter message like "StoppedTask: Task failed to start" or message like "Essential container in task exited"
| sort @timestamp desc
| limit 20


import yaml
import json

with open("input.yaml", "r") as yamlfile:
    data = yaml.safe_load(yamlfile)

with open("output.json", "w") as jsonfile:
    json.dump(data, jsonfile)


test# Miscellaneous

#!/bin/bash

# Create a new user without login access
sudo adduser fafas --disabled-login

# Remove the user from the "sudo" group
sudo deluser fafas sudo

# Create a .ssh directory for the user
sudo mkdir -p /home/fafas/.ssh

# Add the public key to the authorized_keys file
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDXtOtNhQ2mZ...tDgb username@local_machine" | sudo tee -a /home/fafas/.ssh/authorized_keys > /dev/null

# Set ownership and permissions on the .ssh directory and authorized_keys file
sudo chown -R fafas:fafas /home/fafas/.ssh
sudo chmod 700 /home/fafas/.ssh
sudo chmod 600 /home/fafas/.ssh/authorized_keys



"provisioners": [
  {
    "type": "file",
    "source": "path/to/create_user.sh",
    "destination": "/tmp/create_user.sh"
  },
  {
    "type": "shell",
    "script": "/tmp/create_user.sh"
  }
]


####################kong####################

 local http = require "resty.http"
                local httpc = http.new()
                
                -- set the request headers
                ngx.req.set_header("X-Forwarded-URL", ngx.var.request_uri)
                ngx.req.set_header("X-Forwarded-Method", ngx.req.get_method())
                
                -- make a copy of the original headers
                local headers = ngx.req.get_headers()
                local original_headers = {}
                for k, v in pairs(headers) do
                  original_headers[k] = v
                end
                
                -- read the body data
                ngx.req.read_body()
                local body_data = ngx.req.get_body_data()
                
                -- make a request to the validation server
                local res, err = httpc:request_uri("http://localhost:8080/request-validations", {
                  method = "POST",
                  headers = original_headers,
                  body = body_data
                })
                
                -- if the response is not 200, return the full response to the caller
                if res.status ~= 200 then
                  ngx.status = res.status
                  ngx.say(res.body)
                  ngx.exit(ngx.status)
                end

from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, World!', 200

if __name__ == '__main__':
    app.run()

python3 -m http.server 8000 --cgi

python3 -c "from flask import Flask; app = Flask(__name__); @app.route('/'); def hello(): return 'Hello, World!', 200; app.run()"

                -- use the Kong HTTP client
                local http = kong.service.request.set_http_client("resty")
                local httpc = http.new()
                
                -- set the request headers
                ngx.req.set_header("X-Forwarded-URL", ngx.var.request_uri)
                ngx.req.set_header("X-Forwarded-Method", ngx.req.get_method())
                
                -- make a copy of the original headers
                local headers = ngx.req.get_headers()
                local original_headers = {}
                for k, v in pairs(headers) do
                  original_headers[k] = v
                end
                
                -- read the body data
                ngx.req.read_body()
                local body_data = ngx.req.get_body_data()
                
                -- make a request to the validation server
                local res, err = httpc:request_uri("http://localhost:8080/request-validations", {
                  method = "POST",
                  headers = original_headers,
                  body = body_data
                })
                
                -- if the response is not 200, return the full response to the caller
                if res.status ~= 200 then
                  ngx.status = res.status
                  ngx.say(res.body)
                  ngx.exit(ngx.status)
                end

export KONG_UNTRUSTED_LUA_SANDBOX_REQUIRES=resty.http

untrusted_lua_sandbox_requires = resty.template
