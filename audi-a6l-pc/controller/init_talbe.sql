create table audi_a6l_zan(
	id int unsigned not null auto_increment comment 'id',
	num int unsigned not null default 0 comment '点赞人数',
	type tinyint not null comment '类型',
	PRIMARY KEY (`id`)
)engine=innodb default charset=utf8 comment 'a6l点赞表';

insert into audi_a6l_zan(type) values(1);
