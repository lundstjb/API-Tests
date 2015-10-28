var config = {};

config.host = "URL";

config.generic = {};
config.generic.keys = {};

config.generic.keys.object = ['meta', 'data'];
config.generic.keys.meta = ['user', 'date', 'response_time'];
config.generic.keys.error = ['developer_message', 'error_code', 'more_info'];

config.capabilities = {};
config.capabilities.keys = ['id','is_active','short_name','full_name','short_description','full_description','is_external','capability_url','image_url',
                            'user_support','help_docs_url','release_notes_url','types','policy_stewards'];

module.exports = config;
