<?php

class HymnalDao extends CI_Model{
	
	public function findAll(){
		$rs = $this->db->select("id,title,title_plain,REPLACE(SUBSTRING(content,1,40),'1.','') as preview,content",false)
					->from("hymns")
					->order_by("title_plain asc")
					->get();
		
		return $rs->result();
	}

}