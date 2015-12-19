<?php

/**
 * Class PresentationForm
 */
final class PresentationForm extends BootstrapForm
{

    public function __construct($controller, $name, $actions, ISummit $summit) {

        Requirements::javascript(Director::protocol() . "ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js");
        Requirements::javascript(Director::protocol() . "ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/additional-methods.min.js");

        parent::__construct(
            $controller, 
            $name, 
            $this->getPresentationFields(),
            $actions,
            $this->getPresentationValidator()
        );

        $script = <<<JS
          var form_validator_{$this->FormName()} = null;
          (function( $ ){

                $(document).ready(function(){
                    form_validator_{$this->FormName()} = $('#{$this->FormName()}').validate(
                    {
                        ignore:[],
                        highlight: function(element) {
                            $(element).closest('.form-group').addClass('has-error');
                        },
                        unhighlight: function(element) {
                            $(element).closest('.form-group').removeClass('has-error');
                        },
                        errorElement: 'span',
                        errorClass: 'help-block',
                        errorPlacement: function(error, element) {
                            if(element.parent('.input-group').length) {
                                error.insertAfter(element.parent());
                            } else {
                                error.insertAfter(element);
                            }
                        },
                       invalidHandler: function(form, validator) {
                            if (!validator.numberOfInvalids())
                                return;
                            var element = $(validator.errorList[0].element);
                            if(!element.is(":visible")){
                                element = element.parent();
                            }

                            $('html, body').animate({
                                scrollTop: element.offset().top
                            }, 2000);
                        },
                    });
                });
                // End of closure.
        }(jQuery ));
JS;

        Requirements::customScript($script);
    }

    protected function getPresentationFields() {
        $categorySource = Summit::ActiveSummit()->Categories()->map('ID','FormattedTitleAndDescription')->toArray();
        $categorySource['other'] = '<h4 class="category-label">Other topic...</h4>';

        $fields = FieldList::create()
            ->text('Title', 'Proposed Presentation Title*')
                ->configure()
                    ->setAttribute('autofocus','TRUE')
                ->end()
            ->dropdown('Level','Please select the level of your presentation content')
                ->configure()
                    ->setEmptyString('-- Select one --')
                    ->setSource(Presentation::create()->dbObject('Level')->enumValues())
                ->end()
            ->literal('AbstractHelp','<hr/><p>YouTube and other services limit the length of your presentation\'s description. We will take the first 100 characters of your abstract to display in the YouTube description.</p>')
            ->tinyMCEEditor('ShortDescription','Abstract* (max 1000 chars)')
                ->configure()
                    ->setRows(20)
                    ->setColumns(8)
                    ->setMaxCharLimit(1000)
                    ->setRequired(true)
                ->end()
            ->tinyMCEEditor('ProblemAddressed','What is the problem or use case you’re addressing in this session?* (max 1000 chars)')
                ->configure()
                    ->setRows(20)
                    ->setColumns(8)
                    ->setMaxCharLimit(1000)
                    ->setRequired(true)
                ->end()
            ->tinyMCEEditor('AttendeesExpectedLearnt','What should attendees expect to learn?* (max 1000 chars)')
                ->configure()
                    ->setRows(20)
                    ->setColumns(8)
                    ->setMaxCharLimit(1000)
                    ->setRequired(true)
                ->end()
            ->tinyMCEEditor('SelectionMotive','Why should this session be selected?* (max 1000 chars)')
                ->configure()
                    ->setRows(20)
                    ->setColumns(8)
                    ->setMaxCharLimit(1000)
                    ->setRequired(true)
                ->end()
            ->literal('PresentationMaterialsTitle','<h3>Please provide any relevant links to additional information, such as code repositories, case studies, papers, blog posts etc. (Up to 5 links)</h3>')
            ->text('PresentationLink[1]','#1')
            ->text('PresentationLink[2]','#2')
            ->text('PresentationLink[3]','#3')
            ->text('PresentationLink[4]','#4')
            ->text('PresentationLink[5]','#5')
            ->literal('HR','<hr/>')            
            ->optionset('CategoryID','What is the general topic of the presentation?')
                ->configure()
                    ->setSource($categorySource)
                ->end()
            ->text('OtherTopic','Other topic (if one above does not match)')
                ->configure()
                    ->displayIf('CategoryID')->isEqualTo('other')->end()
                ->end()
            ->hidden('ID','ID');
        return $fields;
    }

    protected function getPresentationValidator()
    {
        return RequiredFields::create('Title','ShortDescription','ProblemAddressed','AttendeesExpectedLearnt','SelectionMotive','Level');
    }

    public function loadDataFrom($data, $mergeStrategy = 0, $fieldList = null)
    {
        parent::loadDataFrom($data, $mergeStrategy, $fieldList);
        if (!$data instanceof Presentation) {
            return;
        }

        $presentation = $data;

        foreach ($presentation->Materials()->filter('ClassName', 'PresentationLink') as $key => $link)
        {
            if ($key > 4) break;
            $this->fields->fieldByName('PresentationLink['.($key+1).']')->setValue($link->Link);
        }

        return $this;
    }

    public function saveInto(DataObjectInterface $dataObject, $fieldList = null)
    {

        parent::saveInto($dataObject, $fieldList);

        if (!$dataObject instanceof Presentation) {
            return;
        }

        $presentation = $dataObject;

        $old_materials = $presentation->Materials()->filter('ClassName', 'PresentationLink');
        foreach($old_materials as $o) $o->Delete();

        for($i = 1 ; $i <= 5 ; $i++ ){
            $field = $this->fields->fieldByName("PresentationLink[{$i}]");
            if(is_null($field)) continue;
            $val = $field->Value();
            if(empty($val)) continue;
            $presentation->Materials()->add( PresentationLink::create(array('Link' => trim($val))));
        }
    }


}