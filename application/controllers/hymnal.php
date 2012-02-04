<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Hymnal extends CI_Controller {

	function __construct(){
		CI_Controller::__construct();

		$this->load->model("hymnaldao");
	}
	
	public function index(){
		$this->load->view('mobile');
	}

	public function findAll(){
		$hymns = $this->hymnaldao->findAll();

		echo json_encode(array(
			"success"	=> true,
			"data"		=> $hymns
		));
	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */