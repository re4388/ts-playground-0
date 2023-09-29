

class apple {
  private async getTemplateById(id: string): Promise<Template> {
    return this.templateRepository.findOneBy({ id });
  }
}
